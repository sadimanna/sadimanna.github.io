---
title: "Hosting Your Own LLM Server"
date: "2026-03-01"
categories: ["LLM", "GGUF", "LLama Cpp"]
tags: ["llama.cpp", "GGUF", "Llama Server", "FastAPI", "LLM"]
excerpt: "Sending Text and Files to a Local Model Using FastAPI and llama-server"
---

<figure class="pr ps pt pu pv pw po pp paragraph-image">
<img src="_media/847506_image1.jpg" loading="eager"
role="presentation" />
</figure>

Large language models are easy to run locally now. But running a model
is not the same as **serving** it.

If you want to build real applications, you must learn how to:

- Accept HTTP requests
- Parse JSON and multipart form data
- Handle binary file uploads
- Forward inputs to an LLM
- Return structured responses

In this tutorial, we’ll build production-style servers for:

1.  **Text-only LLM**
2.  **Multimodal LLM (text + image)**

We’ll implement this in two ways:

- ✅ Using **FastAPI + Transformers**
- ✅ Using **FastAPI + llama-cpp (GGUF)**
- ✅ Using **llama-server (native llama.cpp
  server)**

All examples follow proper `multipart/form-data` format for file
uploads.

## Architecture Overview

```bash
Client (curl / browser / app)
        ↓
HTTP Request (JSON or multipart)
        ↓
FastAPI or llama-server
        ↓
LLM (Transformers or GGUF)
        ↓
Response
```

## Part 1 — FastAPI + Transformers (Text-Only LLM)

We’ll start with a text-only model.

## Install

```bash
pip install fastapi uvicorn transformers torch
```

## Server Code (Text-Only)

```bash
# server_text.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI()

model_id = "openai-community/gpt2"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
model.eval()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    inputs = tokenizer(req.message, return_tensors="pt")

    with torch.no_grad():
        output = model.generate(**inputs, max_new_tokens=100)
    
    response = tokenizer.decode(output[0], skip_special_tokens=True)

    return {"response": response}
```

## Run Server

```bash
uvicorn server_text:app --host 127.0.0.1 --port 8000
```

## Test

```bash
curl -X POST http://localhost:8000/chat \
-H "Content-Type: application/json" \
-d '{"message":"Explain pneumonia"}'
```

## Part 2 — FastAPI + Transformers (Multimodal LLM)

Now, let’s serve a multimodal model like MedGemma.

## Get Siladittya Manna’s stories in your inbox

Join Medium for free to get updates from this writer.

Subscribe

Subscribe

<img
src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTEiIHZpZXdib3g9IjAgMCAxMSAxMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0iYWJmIj48cGF0aCBkPSJNMCA2LjMxM0wzLjcwNCAxMC4wMThMNC42MDggMTAuOTIyTDUuMjY4IDkuODI3TDEwLjU2NCAxLjAzMkw4Ljg1IDBMMy41NTQgOC43OTVMNS4xMTcgOC42MDRMMS40MTMgNC44OTlMMCA2LjMxM1oiIC8+PC9zdmc+"
class="abf" />

Remember me for faster sign in

We must use `multipart/form-data` because we are sending binary images.

## Install

```bash
pip install pillow
```

## Server Code (Text + Image)

```bash
# server_multimodal.py

from fastapi import FastAPI, UploadFile, File, Form
from transformers import AutoProcessor, AutoModelForImageTextToText
from PIL import Image
import torch
import io

app = FastAPI()

model_id = "google/medgemma-4b-it"

processor = AutoProcessor.from_pretrained(model_id)
model = AutoModelForImageTextToText.from_pretrained(
    model_id,
    torch_dtype=torch.float16
)
model.eval()

@app.post("/chat")
async def chat(
    message: str = Form(...),
    image: UploadFile = File(...)
):

    # Read binary image
    image_bytes = await image.read()

    # Convert to PIL
    pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    messages = [{
        "role": "user",
        "content": [
            {"type": "text", "text": message},
            {"type": "image", "image": pil_image}
        ]
    }]

    inputs = processor.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=True,
        return_tensors="pt"
    )

    with torch.no_grad():
        output = model.generate(**inputs, max_new_tokens=200)
    
    response = processor.decode(
        output[0][inputs["input_ids"].shape[-1]:],
        skip_special_tokens=True
    )
    return {"response": response}
```

## Test (Multipart)

```bash
curl -X POST http://localhost:8000/chat \
-F "message=Describe this X-ray" \
-F "image=@xray.png"
```

Here:

- `-F` builds multipart
- Image is sent as raw binary
- No ***base64*** encoding

## Part 3 — FastAPI + llama-cpp (GGUF Text Model)

**GGUF** models run through ***llama-cpp***, which is a ***C++***
backend.

## Install (CPU)

```bash
pip install llama-cpp-python
```

For GPU (CUDA):

```bash
CMAKE_ARGS="-DGGML_CUBLAS=on" pip install llama-cpp-python --no-cache-dir
```

## Server Code (Text-Only GGUF)

```bash
# server_gguf_text.py
from fastapi import FastAPI
from pydantic import BaseModel
from llama_cpp import Llama

app = FastAPI()

model = Llama.from_pretrained(
    repo_id="unsloth/medgemma-4b-it-GGUF",
    filename="medgemma-4b-it-Q4_K_M.gguf",
    n_gpu_layers=0
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    response = model.create_chat_completion(
        messages=[
            {"role": "user", "content": req.message}
        ],
        max_tokens=200
    )
    return {"response": response["choices"][0]["message"]["content"]}
```

## Part 4 — FastAPI + llama-cpp (Multimodal GGUF with mmproj)

Multimodal GGUF models require:

- Main model **GGUF**
- **mmproj** file (vision projection weights)

## Load Model with mmproj

```bash
# server_gguf_mm.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from llama_cpp import Llama
from llama_cpp.llama_chat_format import Llava15ChatHandler
import base64

app = FastAPI()

# ---------------------------------------------------------
# Load Multimodal GGUF Model Properly
# ---------------------------------------------------------
# Load vision projection (mmproj) from locally downloaded path
# chat_handler = Llava15ChatHandler(
#     clip_model_path="/path/to/mmproj-medgemma-4b-it.gguf"
# )

# Load vision projection (mmproj) from HF
chat_handler = Llava15ChatHandler.from_pretrained(
    repo_id="unsloth/medgemma-4b-it-GGUF",
    filename="mmproj-BF16.gguf"
)

# Load model from locally downloaded path
# model = Llama(
#             model_path="./path/to/llava/llama-model.gguf",
#             chat_handler=chat_handler,
#             n_gpu_layers=0
# )

# Load model from HF
model = Llama.from_pretrained(
    repo_id="unsloth/medgemma-4b-it-GGUF",
    filename="medgemma-4b-it-Q4_K_M.gguf",
    chat_handler=chat_handler,
    n_gpu_layers=0
)

# ---------------------------------------------------------
# Multipart Endpoint
# ---------------------------------------------------------
@app.post("/chat")
async def chat(
    message: str = Form(...),
    image: UploadFile = File(...)
):

    # Read raw binary
    image_bytes = await image.read()
    # Convert to base64
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    # Create data URL
    data_url = f"data:{image.content_type};base64,{image_base64}"

    response = model.create_chat_completion(
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": message},
                    {
                        "type": "image_url",
                        "image_url": {"url": data_url}
                    }
                ]
            }
        ],
        max_tokens=200
    )

    return JSONResponse({
        "response": response["choices"][0]["message"]["content"]
    })
```

Since the above accepts a ***multipart/form-data***, you can use the
same command as in **Part 2**.

## Part 5 — Using llama-server (Native llama.cpp Server)

> llama.cpp provides a built-in server.

To use llama-server, you need to build llama.cpp from source to obtain
the ***llama-server*** **binary**.

<a
href="/the-owl/%EF%B8%8F-how-to-start-using-llama-server-92aa6f81edc8?source=post_page-----31e171576215---------------------------------------"
rel="noopener follow" target="_blank" data-discover="true"></a>

## ⚙️ How to Start Using llama-server

### You Must Build llama.cpp first

medium.com

## Run Text Model

***If the model is downloaded locally***

```bash
./llama-server \
  -m models/medgemma-4b-it-Q4_K_M.gguf \
  --port 8000
```

***If the model needs to be downloaded from HF***

```bash
./llama-server \
--hf-repo unsloth/medgemma-4b-it-GGUF \
--hf-file medgemma-4b-it-Q4_K_M.gguf \
--port 8000
```

Then:

```bash
curl http://localhost:8000/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{"messages":[{"role":"user","content":"Explain pneumonia"}]}'
```

## Run Multimodal Model

***Assuming the models are downloaded locally***

```bash
./llama-server \
  -m models/medgemma-4b-it-Q4_K_M.gguf \
  --mmproj models/mmproj-medgemma-4b-it.gguf \
  --port 8000

# Automatically Download multimodal models

./llama-server \
--hf unsloth/medgemma-4b-it-GGUF \
--port 8000
```

Then:

```bash
curl http://localhost:8000/v1/chat/completions \
-d '{"messages": [{"role": "user","content": [{"type": "image_url","image_url": {"url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Chest_Xray_PA_3-8-2010.png"}},{"type": "text","text": "Describe this image in detail."}]}]}'
```

If the model supports multimodal, you can input the media file via the
`image_url` content part. ***llama-server*** supports both **base64**
and **remote URL** as input.

The server internally parses the multipart and routes the image into the
vision encoder.

## Sample Output

```bash
{
 “id”: “chatcmpl-kfKSD8ArfZc948prcuKjICuE7YG0nVKI”,
 “object”: “chat.completion”,
 “created”: 1772387732,
 “model”: “unsloth/medgemma-4b-it-GGUF”,
 “system_fingerprint”: “b8183–66d65ec29”,
 “choices”: [
 {
 “index”: 0,
 “message”: {
 “role”: “assistant”,
 “content”: “Detailed chest X-ray description provided above…”
 },
 “finish_reason”: “stop”
 }
 ],
 “usage”: {
 “prompt_tokens”: 273,
 “completion_tokens”: 299,
 “total_tokens”: 572
 },
 “timings”: {
 “prompt_ms”: 276136.242,
 “prompt_per_second”: 0.988,
 “predicted_ms”: 145214.151,
 “predicted_per_second”: 2.059
 }
}
```

---

[Link](https://medium.com/the-owl/hosting-your-own-llm-server-31e171576215) to this article on Medium
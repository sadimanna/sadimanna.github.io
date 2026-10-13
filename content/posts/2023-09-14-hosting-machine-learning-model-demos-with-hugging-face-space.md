---
title: "Hosting Machine Learning Model Demos with Hugging Face Spaces and Streamlit"
date: 2023-09-14
categories: ["Machine Learning", "Deployment"]
permalink: /blog/hosting-machine-learning-model-demos-with-hugging-face-space/
canonical_url: https://medium.com/@mannasiladittya/hosting-model-demos-with-hugging-face-spaces-and-streamlit-ea0db5f2dd54
tags: [machine-learning, huggingface, streamlit, deployment, demo]
---
---

![](/images/blog/hosting-machine-learning-model-demos-with-hugging-face-space/img1.png)

This article will describe the steps required to set up a demo for a machine / deep learning model on Hugging Face Spaces using Streamlit. The article is divided into the following parts:

1. Introduction to the components
2. How to access the camera on the user's device from the Hugging Face Space environment.
3. How to set up the demo on HF Spaces
4. Issues with the STUN server in the Streamlit app and possible solutions.
5. How to manage Spaces using GitHub workflows and related issues.

### Introduction to the components

> What is Hugging Face Spaces?

**Hugging Face** provides an amazing tool to create and host your machine learning demos. The feature that provides this is ***Hugging Face Spaces***. One can go to <https://huggingface.co/spaces> and find several hosted ML demos built by people from all over the world.

[**Spaces - Hugging Face**  
*Discover amazing ML apps made by the community*huggingface.co](https://huggingface.co/spaces "https://huggingface.co/spaces")

To create a new **Space**, click on the “**Create new Space**” button on the top right corner of the page. Space is similar to a GitHub repository, and the interface is also very similar to GitHub.

> Steps:

1. Enter a **name** for your **repository** and select the **license** you want your demo to have.
2. Then select the library you want to use for the **Space SDK**. The input, output, and interface of the demo will be done using the chosen library. For this article, I will be using ***Streamlit***.
3. The next step is to choose the **hardware** you want your demo to run on. This can be changed later in the settings of your Space. The default is   
   “**CPU basic · 2 vCPU · 16 GB · FREE”**. You can switch to different hardware at any time in your **Space** settings.
4. Finally, choose the privacy setting for your space.

> What is Streamlit?

***Streamlit*** provides a faster way to build and share data apps. ***Streamlit*** turns data scripts into shareable web apps in minutes. You can find out more about it here: <https://streamlit.io/>

[**Streamlit \* A faster way to build and share data apps**  
*Streamlit is an open-source app framework for Machine Learning and Data Science teams. Create beautiful web apps in…*streamlit.io](https://streamlit.io/ "https://streamlit.io/")

On your local machine, you can install ***Streamlit*** using the following command:


```bash
pip install streamlit
```


In the Hugging Face Spaces environment, ***Streamlit*** comes pre-installed.

---

### How to access the camera on the user’s device from the Hugging Face Spaces environment

> How do I access the camera?

If you want to show a demo on real-time data using the webcam on your laptop or even the camera on your mobile, you need to install the ***streamlit-webrtc*** library.

[**GitHub - whitphx/streamlit-webrtc: Real-time video and audio streams over the network, with…**  
*Real-time video and audio streams over the network, with Streamlit. - GitHub - whitphx/streamlit-webrtc: Real-time…*github.com](https://github.com/whitphx/streamlit-webrtc "https://github.com/whitphx/streamlit-webrtc")

The ***streamlit-webrtc*** library is built for handling real-time video and audio over the network using ***Streamlit****.* It can be installed using the following command:


```bash
pip install streamlit-webrtc
```


A few examples on using ***Streamlit*** and ***streamlit-webrtc*** for different applications are also available in this GitHub repository

[**GitHub - whitphx/streamlit-webrtc-example: Real time video and audio processing examples with…**  
*Real time video and audio processing examples with Streamlit and streamlit-webrtc - GitHub …*github.com](https://github.com/whitphx/streamlit-webrtc-example "https://github.com/whitphx/streamlit-webrtc-example")

---

### How to set up the demo on HF Spaces

> What to do next to setup the demo?

Let's take a look at the steps to set up the demo, listed below

> Set metadata

First of all, we need to set the metadata in the **README.md** file.

In my demo, I used the following lines


```text
---
title: Object Detection MobileNetSSD Demo
emoji: 📷
colorFrom: red
colorTo: purple
sdk: streamlit
```


On my profile, it shows like this

![](/images/blog/hosting-machine-learning-model-demos-with-hugging-face-space/img2.png)
> Create a ***requirements.txt*** file.

In the ***requirements.txt*** file, add the libraries that must be installed in the environment. For example, in my demo, I had the following in my ***requirements.txt*** file:


```text
numpy
opencv-python-headless==4.8.0.76
streamlit_webrtc==0.47.0
pydub==0.25.1
twilio~=8.5.0
```


> Create a ***packages.txt*** file

In the ***packages.txt*** file, add the following line:


```text
ffmpeg
```


> Create a ***runtime.txt*** file

You can also create a ***runtime.txt*** file containing the Python version on which you want to run your code. However, these depend on the compatibility with other libraries being used. The ***runtime.txt*** file should contain the following line:


```text
python-3.8.7
```


> Create an ***app.py*** file

The ***app.py*** file will contain all the working code, which will control everything from taking input to showing the outputs using ***Streamlit***. Of course, you can have other supporting files for your model. However, when the app is launched, you see the output of the following command:


```text
streamlit run app.py
```


For running your app on your local machine, you can use the same command.

* Try copying one of the example demos from

[**streamlit-webrtc-example/pages at main · whitphx/streamlit-webrtc-example**  
*Real time video and audio processing examples with Streamlit and streamlit-webrtc - streamlit-webrtc-example/pages at…*github.com](https://github.com/whitphx/streamlit-webrtc-example/tree/main/pages "https://github.com/whitphx/streamlit-webrtc-example/tree/main/pages")

to your ***app.py*** and commit.

As soon as you commit, it will start building the container. You can see the logs by clicking the “***Logs***” button in the top panel. You can see the libraries being installed and also track if any errors occur during the build or the app's execution.

Once the status changes from “*Building*” to “*Running*”, click on the “***App***” tab on the top panel. Here, you can see the interface of your app as per your instructions or code.

> For hosting you own demo

To host your own demo, commit all the required files (supporting files containing the model definition and helper functions) to the repository and make the necessary changes to the ***app.py*** file. Before committing, you also need to change the ***requirements.txt***, ***packages.txt,*** and ***runtime.txt*** files.

* For example, if you need a specific version of ***Torch*** or ***Cuda*** runtime, add the following lines:


```text
torch==1.13.1+cu117 
torchvision==0.14.1+cu117
```


* If you are only using the free CPU tier, you won’t need Cuda. In that case, add the following lines (as per <https://pytorch.org/get-started/previous-versions/>)


```text
torch==1.13.1+cpu
torchvision==0.14.1+cpu
torchaudio==0.13.1 
--extra-index-url https://download.pytorch.org/whl/cpu
```


* If you need to commit large model files (> 10 MB), be sure to use ***git lfs.***

---

### Issues with the STUN server in the Streamlit app and possible solutions

> With every application comes an Issue

The ***streamlit-webrtc*** uses **Twilio STUN/TURN** servers. If the credentials are not set, it falls to the free **STUN** servers provided by Google. However, the free **STUN** servers provided by Google are not always stable or working.

To use a **Twilio STUN/TURN** server, create an account on Twilio. Twilio provides free **STUN** servers and paid **TURN** servers. Twilio also provides an initial credit of about **$15.50**.

1. Go to **Settings** of your HF Space
2. Scroll down to “**Variables and Secrets**”
3. Click on “**New secret**”
4. Type in “**TWILIO\_ACCOUNT\_SID**” in the **Name** textbox. In the **VALUE** textbox, paste the ***Account SID*** from your **Twilio >** **Accounts > *API Keys & Tokens*** tab.
5. Click on “**New secret**” again
6. Type in “**TWILIO\_AUTH\_TOKEN**” in the **Name** textbox. In the **VALUE** textbox, paste the ***Auth Token*** from your **Twilio > Accounts >** ***API Keys & Tokens*** tab.

The container will start rebuilding. You can see your usage summary in **Twilio >** **Billing > Usage Summary.** To continue using the **TURN** server after the given credit runs out, you need to buy **TURN** server access from **Twilio**.

---

### How to manage Spaces using GitHub workflows and related issues

> Managing HF Spaces using GitHub workflows

You can also manage your Spaces from **GitHub** using **GitHub Actions**. Good documentation is provided here

[**Managing Spaces with Github Actions**  
*We're on a journey to advance and democratize artificial intelligence through open source and open science.*huggingface.co](https://huggingface.co/docs/hub/spaces-github-actions "https://huggingface.co/docs/hub/spaces-github-actions")

> Steps

1. Create a repository on **GitHub** and name it anything you want. Subsequently, create an ***empty* Space** in **Hugging Face Spaces**.
2. Add your **Spaces** app as an additional remote to your existing Git repository


```bash
git clone https://github.com/GIT_USERNAME/REPO_NAME
cd REPO_NAME
```


This is done to set up your GitHub repository and Spaces app together.

3. Then force push to sync everything for the first time:


```bash
git push --force space main
```


4. Create a GitHub Secret ( **REPO > Settings > Secrets and variables > Actions** ) with your `HF_TOKEN`. You can find your **Hugging Face API** token under **Access Tokens** on your Hugging Face profile (If you don’t already have one, create a new token).

5. Configure a **GitHub** workflow and add the contents (*also given below*) in

[**Managing Spaces with Github Actions**  
*We're on a journey to advance and democratize artificial intelligence through open source and open science.*huggingface.co](https://huggingface.co/docs/hub/spaces-github-actions "https://huggingface.co/docs/hub/spaces-github-actions")

to the workflow file. Replace `HF_USERNAME` with your username and `SPACE_NAME` with your Space name.


```text
name: Sync to Hugging Face hub
on:
```


You can add the second workflow given in the above link to check for large files.

> Steps after editing the files

Note that, at this stage the Spaces repository is empty. After adding the required files run the following commands:


```bash
git add .
git commit -m “commit message”
git push origin main
```


You can see the changes made to the files in the GitHub repository being updated in the Hugging Face Spaces repository too.

> Problems with large files

When trying to upload large model files (> 10MB), you need to use Git LFS. However, there is a limit to the bandwidth and storage in a free tier.

For uploading large files, before adding and committing, you need to run the following commands in order:


```bash
git lfs install
git lfs track *.[ext]
git add *.[ext]
git commit -m "Added large model file"
git push origin main
```


Exceeding the limits can cause syncing errors between Space and your GitHub repo.

---

A sample **HF Spaces** demo of a MobileNet SSD Object Detection is hosted here

[**Object Detection MobileNetSSD Demo - a Hugging Face Space by sadimanna**  
*Discover amazing ML apps made by the community*huggingface.co](https://huggingface.co/spaces/sadimanna/object-detection-mobilenetssd "https://huggingface.co/spaces/sadimanna/object-detection-mobilenetssd")

The corresponding **GitHub** repository is

[**GitHub - sadimanna/object-detection-mobilenetssd: HuggingFace Demo using Streamlit**  
*HuggingFace Demo using Streamlit. Contribute to sadimanna/object-detection-mobilenetssd development by creating an…*github.com](https://github.com/sadimanna/object-detection-mobilenetssd "https://github.com/sadimanna/object-detection-mobilenetssd")

To embed your space on any website click the button indicated by the red rectangle in the picture below

![](/images/blog/hosting-machine-learning-model-demos-with-hugging-face-space/img3.png)

Then click “***Embed this space***” from the drop-down menu. You can use the **Iframe** script or the **Direct URL** in your website.

The above HF Spaces demo is embedded below (click to open in a new window)

[**Hugging Face - The AI community building the future.**  
*We're on a journey to advance and democratize artificial intelligence through open source and open science.*sadimanna-object-detection-mobilenetssd.hf.space](https://sadimanna-object-detection-mobilenetssd.hf.space "https://sadimanna-object-detection-mobilenetssd.hf.space")

---

Clap and share if you like this article. Follow for more.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/hosting-model-demos-with-hugging-face-spaces-and-streamlit-ea0db5f2dd54).*

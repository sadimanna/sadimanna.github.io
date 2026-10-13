---
title: "How to Split a Centralized Dataset for Federated Learning Simulation"
date: 2025-08-07
permalink: /blog/how-to-split-a-centralized-dataset-for-federated-learning-si/
canonical_url: https://medium.com/@mannasiladittya/how-to-split-a-centralized-dataset-for-federated-learning-simulation-0d8d97dcafb5
tags: [federated-learning, machine-learning, data-science, privacy]
---
---

![](/images/blog/how-to-split-a-centralized-dataset-for-federated-learning-si/img1.jpeg)

Federated Learning (FL) holds the promise of training powerful AI models on decentralized data, preserving privacy and respecting data sovereignty. But before you can deploy a complex FL system, you need to test, simulate, and validate it. And that often starts with a classic challenge: you have one large, centralized dataset, and you need to pretend it lives in multiple, separate “silos” or “client” locations.

Manually dragging and dropping thousands of files is not an option. It’s tedious, error-prone, and not repeatable. What you need is a robust, scriptable way to partition your data.

In this guide, we’ll tackle a common scenario: splitting a large medical imaging dataset from a single source folder into multiple destination folders, each representing a different “hospital” or “client” in our federated network.

### The Scenario

Imagine we have a (imaginary) master folder `ITKSNAP_DATA`, containing thousands of NIfTI files (*`.nii.gz`*). These files are grouped by patient ID, and we want to distribute them into different client folders for our simulation.

* Patients P00— P20 belong to `ITKSNAP_1` (Client 1)
* Patients P21 — P38 belong to `ITKSNAP_2` (Client 2)
* Patients P39 — P54 belong to `ITKSNAP_3` (Client 3)
* Patients P55 — P70 belong to `ITKSNAP_4` (Client 4)
* Patients P71 — P99 belong to `ITKSNAP_5` (Client 5)

For each patient `PXX`, there are multiple associated files we need to move together, such as *`****image\_PXX.nii.gz****`*, *`label\_PXX.nii.gz`*, etc., or if the data contains multiple sequences like T1, T1CE, or T2, as in the BraTS dataset, the files will be named `BraTS20_Training_038_t1.nii.gz` , `BraTS20_Training_038_t2.nii.gz` , `BraTS20_Training_038_seg.nii.gz` .

Here are three programmatic approaches to solve this, ranging from a quick command-line solution to a robust and reusable Python script.

---

### Approach 1: The Data-Driven Shell Script

This is a powerful and concise method for users comfortable in a Linux, macOS, or WSL terminal. We define our data distribution plan in arrays and let a single loop do all the work. It’s the epitome of the “Don’t Repeat Yourself” (DRY) principle.

Best for: Quick, configurable, one-off tasks in a Bash environment.

#### The Code


```text
#!/bin/bash  
# --- Configuration --- 
# Define the start and end of each number range 
starts=(21 39 55 71) 
ends=(38 54 70 94)  
# Define the corresponding destination folder number for each range 
dest_nums=(1 2 3 4 5)  
# Define the source directory 
source_dir="ITKSNAP_DATA" 
# --- End of Configuration ---  
# Loop through the array indices (0, 1, 2, 3) 
for i in "${!starts[@]}"; do
   start=${starts[i]}
   end=${ends[i]}
   dest_num=${dest_nums[i]}
   dest_dir="ITKSNAP_${dest_num}"
   echo "--- Processing range ${start}-${end} -> ${dest_dir} ---" 
   # Create the destination directory if it doesn't exist 
   mkdir -p "$dest_dir" 
   # Loop through the actual file numbers in the current range 
   for j in $(seq $start $end); do 
       # Check if the main file exists before trying to move anything
       if [ -f "${source_dir}/image_P${j}.nii.gz" ]; then 
           # Use brace expansion to move all related files at once
           mv "${source_dir}/"{image_P,label_P}"${j}.nii.gz" "$dest_dir/"
           echo "Moved files for P${j}"
       fi
   done 
done  
echo "--- All operations complete. ---"
```


#### How It Works

* Configuration Arrays: We store the start numbers, end numbers, and destination folder indices in separate arrays. This keeps the configuration clean and separate from the logic.
* Master Loop: The *`for i in “${!starts[@]}”`* loop iterates through the *indices* of the arrays (0, 1, 2, 3), allowing us to access the corresponding elements from *`starts`*, *`ends`*, and *`dest\_nums`* in each iteration.
* *`mkdir -p`*: This command safely creates the destination directory, including any parent directories, and doesn’t complain if it already exists.
* Brace Expansion: The line *`mv “${source\_dir}/”{image\_P,…}”${j}.nii.gz”`* is a shell superpower. It expands to run the *`mv`* command on all four filenames in a single, clean line.

---

### Approach 2: The Shell Script with a Function

If you find the array logic a bit dense, wrapping the core operation in a function can improve readability. You define the “what” in the function and then simply call it with the “how” and “where.”

Best for: Shell scripters who prefer a more procedural and explicitly readable style.

#### The Code

We do this example for the BraTS dataset, which has a file name of the format `BraTS20_training_007_seg.nii.gz`, that is, the patient indices have leading zeros in the file name.


```text
#!/bin/bash  
# Define a function to move a range of files 
move_file_range() {
   local start=$1
   local end=$2
   local dest_num=$3
   local padding_width=$4 # Accept padding as an argument
   local source_dir="BraTS2020"
   local dest_dir="BraTS2020_${dest_num}"
   echo "--- Processing range ${start}-${end} -> ${dest_dir} ---"
   mkdir -p "$dest_dir" 
   for i in $(seq $start $end); do 
       # Format the number 'i' with leading zeros for BraTS
       local padded_i=$(printf "%0*d" $padding_width $i)

       if [ -f "${source_dir}/BraTS20_training_${padded_i}_seg.nii.gz" ]; then 
           mv "${source_dir}/BraTS20_training_${padded_i}_"{t1,t1ce,t2,flair,seg}".nii.gz" "$dest_dir/"
           echo "Moved files for P${i}"
       fi   
    done 
}  
# Now, just call the function for each task 
move_file_range 0 43 1 3
move_file_range 44 65 2 3
move_file_range 66 67 3 3
move_file_range 68 86 4 3
move_file_range 87 88 5 3
echo "--- All operations complete. ---"
```


#### How It Works

* *‘***move\_file\_range()***’: We encapsulate the entire logic for moving one batch of ﬁles into a reusable function.*
* ***Parameters (‘$1’,* ‘$*2’, ‘*$3’, ‘$4’)**: The function accepts the start number, end number, destination index, and padding width as arguments. if the file names do not have leading zeros, the fourth argument can be removed.
* Clear Calls: The main part of the script is now a simple, readable list of function calls that clearly state the intent for each data split.

---

### Approach 3: The Robust Python Script (Recommended)

For data management, especially in a research or production pipeline, Python is the undisputed champion. It’s more verbose than a shell script but offers unparalleled safety, readability, and cross-platform portability (it works on Windows, macOS, and Linux without changes).

Best for: Repeatable, maintainable, and safe data management workflows.

#### The Code

Save this as *`organize\_data.py`* and run it with *`python organize\_data.py`*.


```python
import os 
import shutil  
# --- Configuration --- 
SOURCE_BASE_DIR = "ITKSNAP_DATA" 
DEST_BASE_DIR = "ITKSNAP"  
# Define the tasks as a list of tuples: (start_num, end_num, destination_folder_index) 
TASKS = [(0, 20, 1),
     (21, 38, 2),
     (39, 54, 3),
     (55, 70, 4),
     (71, 94, 5),
       ]  
# Prefixes of the files to move for each number 
FILE_PREFIXES = ["image_P",
                 "label_P"] 
# Padding Width if reuqired
PADDING_WIDTH = 3
# --- End of Configuration ---  
def partition_data():
    """Organizes files into client folders based on the TASKS configuration."""
    for start_num, end_num, dest_index in TASKS:
        dest_dir = f"{DEST_BASE_DIR}_{dest_index}"
        print(f"--- Processing range {start_num}-{end_num} -> {dest_dir} ---")
        # Create destination directory if it doesn't exist
        os.makedirs(dest_dir, exist_ok=True)
        # Loop through each number in the defined range
        for i in range(start_num, end_num + 1):
           # Format the number 'i' with leading zeros using an f-string
           # padded_i = f"{i:0{PADDING_WIDTH}d}"
           main_file_path = os.path.join(SOURCE_BASE_DIR, f"image_P{i}.nii.gz")
           # main_file_path = os.path.join(SOURCE_BASE_DIR, f"image_P{padded_i}.nii.gz")
           if os.path.exists(main_file_path): 
               print(f"Moving files for P{i}...")
               # print(f"Moving files for P{i}...")
               for prefix in FILE_PREFIXES:
                   filename = f"{prefix}{i}.nii.gz"
                   # filename = f"{prefix}{padded_i}.nii.gz" 
                   source_path = os.path.join(SOURCE_BASE_DIR, filename)
                   if os.path.exists(source_path):
                       # SAFETY FIRST: To test, use copy instead of move
                       # shutil.copy(source_path, dest_dir)
                       shutil.move(source_path, dest_dir)
    print("\n--- All operations complete. ---")  

if __name__ == "__main__": 
    partition_data()
```


#### How It Works

* Clear Configuration: All settings are at the top, making the script easy to adapt for new datasets or splitting strategies.
* *`os.path.join`*: This function intelligently creates file paths that work on any operating system, avoiding common errors with slashes (*`/`*) vs. backslashes (*`\`*).
* *`os.makedirs(…, exist\_ok=True)`*: The Python equivalent of *`mkdir -p`*, ensuring our script doesn’t fail if the destination folder already exists.
* Safety and Explicitness: The code explicitly checks if each file exists before attempting to move it, preventing crashes. The recommendation to use *`shutil.copy`* for a dry run before switching to the destructive *`shutil.move`* is a critical best practice.

### Conclusion: Which Should You Choose?

While shell scripts are fantastic for quick, personal tasks, the Python script is the clear winner for any serious, repeatable workflow. Its explicitness, safety features, and cross-platform nature make it the ideal choice for preparing data in a collaborative or long-term research project.

Properly partitioning your data is the first crucial step in building a meaningful federated learning simulation. By automating this process, you ensure it’s fast, accurate, and ready for the next stage of your experiment. Now that your data is properly siloed, you’re one step closer to training your first federated model.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-to-split-a-centralized-dataset-for-federated-learning-simulation-0d8d97dcafb5).*

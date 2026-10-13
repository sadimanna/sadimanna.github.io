---
title: "Compressing .nii Files to .nii.gz: A Guide to Efficient Data Management with NiBabel and SimpleITK"
date: 2025-05-12
categories: ["Medical AI", "Medical Imaging"]
permalink: /blog/compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-ma/
canonical_url: https://medium.com/@mannasiladittya/compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-management-with-nibabel-and-simpleitk-ec11711de856
tags: [medical-imaging, nibabel, simpleitk, python, neuroimaging]
---
---

![](/images/blog/compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-ma/img1.jpeg)

In medical imaging, handling large datasets efficiently is crucial for storage and processing purposes. Neuroimaging Informatics Technology Initiative (NIfTI) files, commonly used for storing MRI data, can be quite large. Compressing these files into *`.nii.gz`* format saves disk space and facilitates faster data transfers and processing. In this blog, we’ll explore how to use two popular Python libraries — **NiBabel** and **SimpleITK**— to compress *`.nii`* files, achieving size reductions up to tenfold.

**Motivation:** These methods are particularly useful when handling large datasets like BraTS. Specifically speaking, I noticed a discrepancy in the dataset size between BraTS2020 and BraTS2021 datasets downloaded from different sources. While my particular application required using the T1CE planes of the BraTS2020 dataset, the total size occupied by the 369 T1CE scans was about 10 GB, and the whole dataset, including all four planes, FLAIR, T1, T1CE, and T2, amounted to more than 30 GB. But I noticed that the whole BraTS2021 dataset, with about 1500 scans, only occupied about 10 GB of space on the disk.

Upon careful inspection, I came to observe that I had completely skipped noticing that the two datasets that I had downloaded did not have the same file extension, but both were read by SimpleITK or NiBabel without any errors. While the BraTS2020 dataset files had *.nii* file extension, the BraTS2021 dataset files had *.nii.gz* which explained the discrepancy in size.

If having a more compressed file did not cause any issues in the pipeline, why not convert the BraTS2020 dataset into *.nii.gz* format, which would enable me to transfer the whole dataset more efficiently. After converting the BraTS2020 dataset files from .nii to .nii.gz, the dataset size reduced to 3.2 GB from about 30 GB (almost 10 times).

#### Why Compress NIfTI Files?

Compressing *`.nii`* files to *`.nii.gz`* format offers several advantages:

* Reduced Storage Space: The compressed format significantly reduces file size, conserving disk space.
* Enhanced Performance: Smaller files are quicker to read and write, improving data processing speed.
* Ease of Sharing: Reduced file sizes make it easier to share datasets with collaborators.

#### Using NiBabel for Compression

NiBabel is a powerful library for reading and writing NIfTI files. Here’s how you can use it to compress *`.nii`* files:


```python
import nibabel as nib

def compress_nii_to_niigz(input_file, output_file):
    # Load the .nii file using NiBabel 
    nii_image = nib.load(input_file)
    # Save the image in .nii.gz format 
    output_file = input_file.replace('.nii', '.nii.gz')
    nib.save(nii_image, output_file)
    print(f"Compressed {input_file} to {output_file}")

# Example usage 
if __name__ == '__main__':
    compress_nii_to_niigz('/path/to/example.nii')
```


#### Using SimpleITK for Compression

SimpleITK, a simplified layer built on top of the Insight Segmentation and Registration Toolkit (ITK), also provides tools for handling NIfTI files:


```python
import SimpleITK as sitk

def compress_nii_to_niigz_sitk(input_file, output_file):
    # Read the .nii file using SimpleITK 
    image = sitk.ReadImage(input_file) 
    # Write the image in .nii.gz format 
    output_file = input_file.replace('.nii', '.nii.gz')
    sitk.WriteImage(image, output_file) 
    print(f"Compressed {input_file} to {output_file}") 

# Example usage 
if __name__=='__main__':
    compress_nii_to_niigz_sitk('example.nii')
```


#### Conclusion

Both **NiBabel** and **SimpleITK** offer straightforward methods to compress *`.nii`* files into *`.nii.gz`* format, achieving significant reductions in file size. Whether you’re managing large neuroimaging datasets or simply looking to optimise your data storage, these tools provide efficient solutions to streamline your workflow. By adopting compressed formats, you can enhance your data handling capabilities, making it easier to store, process, and share valuable medical imaging data.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-management-with-nibabel-and-simpleitk-ec11711de856).*

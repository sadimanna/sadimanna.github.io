---
title: "Comprehensive Guide to Overlaying Segmentation Masks in Python"
date: 2025-05-30
permalink: /blog/comprehensive-guide-to-overlaying-segmentation-masks-in-pyth/
canonical_url: https://medium.com/@mannasiladittya/comprehensive-guide-to-overlaying-segmentation-masks-in-python-86b67dd93fad
tags: [computer-vision, image-segmentation, python, opencv, matplotlib]
---
---

![](/images/blog/comprehensive-guide-to-overlaying-segmentation-masks-in-pyth/img1.jpeg)

Segmentation masks are fundamental in computer vision applications, from medical imaging to autonomous vehicles. Visualising these masks effectively helps in model evaluation and debugging. In this guide, we’ll explore two powerful methods for overlaying segmentation masks on images:

1. **Transparent Overlay** (using alpha blending with *`cv2.addWeighted`*)
2. **Solid Overlay** (direct pixel replacement)

We’ll implement both methods using OpenCV and NumPy, with detailed explanations and complete code examples.

### Understanding the Methods

### 1. Transparent Overlay (Alpha Blending)

Alpha blending creates a semi-transparent overlay that allows the original image to show through the mask. This is particularly useful when you want to maintain context while visualising the segmentation.

Key Characteristics:

* Adjustable transparency (alpha value between 0 and 1)
* Smooth blending between the mask and the original image
* Ideal for qualitative analysis where context matters


```python
import cv2 
import numpy as np 
import os  

def transparent_overlay(original_img, mask, color=(0, 255, 0), alpha=0.3):
    """     
    Create a transparent overlay of a segmentation mask on an image.
          Args:         
          original_img: Input image in BGR format         
          mask: Binary mask (0 or 255)         
          color: BGR tuple for mask color (default: green)         
          alpha: Transparency level (0-1)          
    Returns:         
          Image with transparent overlay     
    """     
    # Ensure mask is binary and 3-channel     
    if len(mask.shape) == 2:
        mask = (mask > 0).astype(np.uint8) * 255        
        mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)          
    # Apply color to mask
    colored_mask = cv2.bitwise_and(mask, color) 
    # Blend with original image     
    return cv2.addWeighted(original_img, 1 - alpha, colored_mask, alpha, 0)
```


### 2. Solid Overlay (Pixel Replacement)

This method completely replaces pixels in the mask region with a solid colour, providing high-contrast visualisation of the segmented areas.

Key Characteristics:

* No transparency — mask areas are fully colored
* Clear, unambiguous visualisation of segmentation boundaries
* Best for binary segmentation tasks where precision is crucial


```python
def solid_overlay(original_img, mask, color=(0, 0, 255)):
     """     
      Create a solid color overlay of a segmentation mask on an image.
          Args:         
          original_img: Input image in BGR format         
          mask: Binary mask (0 or 255)         
          color: BGR tuple for mask color (default: red)          
      Returns:         
          Image with solid overlay     
      """     
      # Convert mask to 3-channel if needed     
      if len(mask.shape) == 2:
          mask = (mask > 0).astype(np.uint8) 
          mask_3d = np.repeat(mask[:, :, np.newaxis], 3, axis=2) 
      else: 
          mask_3d = (mask > 0).astype(np.uint8)  
        
      # Apply color where mask is active     
      return np.where(mask_3d > 0, color, original_img)
```


### Implementation Details

### Prerequisites

Before running the code, ensure you have:

* Python 3.x
* OpenCV (*`pip install opencv-python`*)
* NumPy (*`pip install numpy`*)

### Complete Code Implementation


```python
def compare_masks(original_img, pred_mask, gt_mask, output_dir):
    """     
    Compare predicted and ground truth masks using both overlay methods.
          Args:         
          original_img: Base image         
          pred_mask: Predicted segmentation mask         
          gt_mask: Ground truth mask         
          output_dir: Directory to save results     
    """     
    os.makedirs(output_dir, exist_ok=True)          
    # Transparent overlays     
    pred_trans = transparent_overlay(original_img, pred_mask, (0, 0, 255))     
    gt_trans = transparent_overlay(original_img, gt_mask, (0, 255, 0))          
    # Solid overlays     
    pred_solid = solid_overlay(original_img, pred_mask, (0, 0, 255))     
    gt_solid = solid_overlay(original_img, gt_mask, (0, 255, 0))          
    # Overlap visualization     
    overlap = cv2.bitwise_and((pred_mask > 0).astype(np.uint8),
                              (gt_mask > 0).astype(np.uint8)) * 255     
    overlap_solid = solid_overlay(original_img, overlap, (0, 255, 255))          

    # Save results     
    cv2.imwrite(f"{output_dir}/predicted_transparent.png", pred_trans)     
    cv2.imwrite(f"{output_dir}/ground_truth_transparent.png", gt_trans)     
    cv2.imwrite(f"{output_dir}/predicted_solid.png", pred_solid)     
    cv2.imwrite(f"{output_dir}/ground_truth_solid.png", gt_solid)     
    cv2.imwrite(f"{output_dir}/overlap_solid.png", overlap_solid)  

# Example usage 

if __name__ == "__main__":     
    # Load sample images     
    original = cv2.imread("sample_image.jpg")     
    pred_mask = cv2.imread("predicted_mask.png", cv2.IMREAD_GRAYSCALE)     
    gt_mask = cv2.imread("ground_truth_mask.png", cv2.IMREAD_GRAYSCALE)          
    # Process and save results     
    compare_masks(original, pred_mask, gt_mask, "output_results")          
    print("Processing complete. Results saved to 'output_results' folder.")
```


### Practical Applications

### Medical Imaging

In radiology, transparent overlays help doctors see tumours (marked in red) while maintaining visibility of surrounding anatomy. The adjustable alpha allows balancing between mask visibility and anatomical context.

### Autonomous Vehicles

For self-driving car systems, solid overlays clearly show detected pedestrians (red) and vehicles (blue) against the camera feed, ensuring quick visual verification of detection accuracy.

### Quality Control

In industrial inspection, solid overlays highlight defective regions on products, allowing quality control personnel to identify issues at a glance.

### Tips for Effective Visualisation

1. Colour Selection:

* Use high-visibility colours (red, green, blue)
* Maintain consistency across your team/project
* Consider colourblind-friendly palettes

2. Transparency Adjustment:

* Start with alpha=0.3 and adjust based on needs
* Use a lower alpha for dense masks
* Use a higher alpha for sparse masks

3. Performance Considerations:

* For video processing, solid overlays are faster
* Transparent overlays work well for static image analysis

### Troubleshooting Common Issues

Problem: Masks don’t align with the image

* Solution: Verify both image and mask have the same dimensions and coordinate system

Problem: Colours appear incorrect

* Solution: Remember OpenCV uses BGR order, not RGB

Problem: Overlay looks pixelated

* Solution: Ensure masks are binary (0 or 255) before processing

### Conclusion

This guide has presented two essential techniques for visualising segmentation masks:

* Transparent overlays for contextual analysis
* Solid overlays for clear, unambiguous visualisation

The provided code offers a complete implementation you can adapt to your specific needs. By mastering both methods, you’ll be equipped to effectively visualise and analyse segmentation results across various computer vision applications.

For further enhancement, consider:

* Adding contour outlines to your overlays
* Implementing custom colourmaps for multi-class segmentation
* Creating animation sequences to show mask evolution over time

Happy coding, and may your segmentation masks always be accurate

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/comprehensive-guide-to-overlaying-segmentation-masks-in-python-86b67dd93fad).*

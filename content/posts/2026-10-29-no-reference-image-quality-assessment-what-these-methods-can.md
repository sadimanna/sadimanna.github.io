---
title: "No-Reference Image Quality Assessment: What These Methods Can (and Cannot) Tell Us"
date: 2026-10-29
categories: ["Deep Learning"]
permalink: /blog/no-reference-image-quality-assessment-what-these-methods-can/
canonical_url: https://medium.com/the-owl/no-reference-image-quality-assessment-what-these-methods-can-and-cannot-tell-us-e68decfbaae1
tags: ["deep-learning", "image", "data-science", "computer-vision", "image-processing"]
---

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img1.png)

Imagine that someone sends you a photograph and asks a simple question: **How good is this image?**

You can probably answer without thinking too much. The image might be blurry, noisy, poorly exposed, overcompressed, or simply unpleasant to look at. But turning that judgement into a numerical score is a much harder problem, especially when the original image is unavailable.

This is the problem of **no-reference image quality assessment (NR-IQA)**, also known as blind image quality assessment (BIQA).

Over the years, researchers have developed everything from statistical models of natural images to convolutional neural networks, contrastive learning methods, and vision transformers to solve this problem. Some of these methods work remarkably well on standard benchmarks. Yet there is an important question worth asking: *what kinds of image degradation have these methods actually learned to recognise?*

That question becomes particularly interesting when the image is not merely noisy or blurry, but geometrically distorted.

### 1. No-reference, full-reference, and reduced-reference IQA

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img2.png)

Before looking at individual papers, it helps to distinguish three related approaches.

**Full-reference (FR-IQA)** methods compare a distorted image against its original, high-quality counterpart. Metrics such as PSNR, SSIM, and FSIM fall into this category. Since the reference is available, the method can directly compare corresponding image information. The catch is that an original image is not always available in real-world applications.

**Reduced-reference (RR-IQA)** methods operate with only partial information about the reference. Instead of receiving the entire original image, they may receive a compact statistical description, selected features, or another reference-derived representation. This reduces the amount of information that needs to be stored or transmitted, while still providing a baseline for comparison.

**No-reference (NR-IQA)** methods receive only the image being evaluated. They must estimate its perceptual quality without seeing the original or relying on a reference-derived quality descriptor.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img3.png)

This makes NR-IQA attractive for evaluating photographs uploaded to social media, images collected from the internet, mobile-camera outputs, and image-processing pipelines where the original is no longer available.

However, there is a trade-off. Without a reference, a model must infer whether an image looks degraded from its visual content, learned representations, or prior knowledge of what a good image should look like.

An image can be sharp but geometrically incorrect. A photograph can also contain intentional blur, unusual lighting, or a perspective change without necessarily being perceived as poor quality. Distinguishing these cases is not straightforward.

### 2. How do we evaluate an IQA model?

Most IQA papers compare predicted quality scores against subjective human ratings. Two metrics appear repeatedly in the literature.

- **Spearman Rank-Order Correlation Coefficient (SRCC or SROCC):** Measures how well the predicted scores preserve the ranking of images according to human judgements. A higher value indicates better rank agreement.
- **Pearson Linear Correlation Coefficient (PLCC):** Measures the linear correlation between predicted and subjective scores, typically after applying a prescribed nonlinear regression to the predictions.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img4.png)

Both are generally reported with values closer to 1 indicating stronger agreement.

A third metric, **Kendall’s rank correlation coefficient (KRCC)**, is also used in IQA research. It evaluates ranking agreement through concordant and discordant pairs.

These metrics tell us how closely a model’s predictions agree with human ratings on a particular test set. They do not, by themselves, tell us whether the model understands every distortion category, generalises to unseen distortions, or distinguishes geometric misalignment from ordinary image degradation.

### The datasets matter, too

A model’s reported performance depends heavily on the dataset used to evaluate it. Some benchmarks contain artificially generated distortions, while others contain photographs captured under real-world conditions.

<https://medium.com/media/b6bbe17ce56075e96e582c02d2eeaf52/href>

The distinction between synthetic and authentic distortions is important. A model can perform well when tested on familiar, controlled artifacts and still struggle with photographs containing unfamiliar combinations of distortions.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img5.png)

There is another important caveat: most of these benchmarks were not specifically designed to evaluate geometric warping, spatial deformation, or displacement fields as independent distortion categories. Consequently, their scores should not be interpreted as evidence that a model can reliably assess such distortions.

### 3. The early days: modelling natural image statistics

One of the earliest influential ideas in blind IQA was that natural images have statistical regularities. Noise, blur, compression, and other distortions tend to alter those regularities.

Instead of learning quality directly from enormous labelled datasets, researchers tried to quantify how far an image deviated from the statistical behaviour of natural scenes.

### 3.1. DIIVINE: identifying distortion before estimating quality

**Paper:** *Blind Image Quality Assessment: From Scene Statistics to Perceptual Quality* — A. K. Moorthy and A. C. Bovik, IEEE Transactions on Image Processing, 2011.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img6.png)

**DIIVINE** uses a two-stage framework. First, it estimates the likely distortion category from natural scene statistics. Then it applies a distortion-specific quality predictor.

This is an intuitive design. Different artifacts leave different statistical signatures, and identifying the distortion first can make quality estimation easier.

The advantage is that **DIIVINE** provides more than a generic quality score: its intermediate representation also carries information about the likely distortion type.

The limitation is equally clear. The model depends on the distortion categories and statistical patterns represented during its design and training. Unfamiliar distortions or mixtures of artifacts can challenge the identification stage, and errors there can affect the final score.

A further concern for our problem is that geometric deformation is not explicitly treated as a dedicated distortion category.

### 3.2. BLIINDS: looking at the image in the frequency domain

**Paper:** *Model-Based Blind Image Quality Assessment: A Natural Scene Statistics Approach in the DCT Domain* — M. A. Saad, A. C. Bovik, and C. Charrier, IEEE Transactions on Image Processing, 2012.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img7.png)

**BLIINDS** takes a different route. It models the statistical behaviour of discrete cosine transform (DCT) coefficients and uses the resulting features to predict image quality.

The intuition is that image degradations alter the frequency-domain statistics of natural scenes. By modelling these changes, the system can estimate quality without a reference image.

Compared with methods that explicitly classify distortion types, **BLIINDS** offers a more general statistical representation and was designed to be computationally efficient.

Its limitation is that statistical regularities are indirect indicators of perceptual quality. Different distortions can produce similar changes in frequency statistics, and natural image content itself can vary considerably.

Geometric distortions can also alter local frequency patterns, but **BLIINDS** does not explicitly estimate the underlying spatial transformation or measure geometric displacement.

### 3.3. BRISQUE: quality assessment directly in the spatial domain

**Paper:** *No-Reference Image Quality Assessment in the Spatial Domain* — A. Mittal, A. K. Moorthy, and A. C. Bovik, IEEE Transactions on Image Processing, 2012.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img8.png)

**BRISQUE** is one of the best-known traditional NR-IQA methods. Instead of operating in the DCT or wavelet domain, it extracts statistics from locally normalised luminance coefficients and their neighbouring products.

These features capture deviations from the statistical behaviour commonly observed in natural images. A regression model then maps the features to a quality score.

**BRISQUE** is relatively lightweight and remains useful as a baseline. It also does not require a separate distortion classifier to choose a quality model for each artifact.

The problem is that natural-scene statistics are not a complete representation of human perception. Content, texture, lighting, and unusual but legitimate image structures can affect the features. Performance can also decline when the test images differ substantially from the data used to train the regressor.

Most importantly, **BRISQUE** does not explicitly estimate image registration errors, local displacement, rotation, or deformation. It can respond to the pixel-level consequences of those changes, but that is not the same as measuring the geometric error itself.

### 3.4. NIQE: learning what a natural image should look like

**Paper:** *Making a Completely Blind Image Quality Analyzer* — A. Mittal, R. Soundararajan, and A. C. Bovik, IEEE Signal Processing Letters, 2013.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img9.png)

NIQE removes one dependency of many earlier methods: human-rated distorted training images.

It builds a statistical model from a collection of natural, undistorted images and measures how far the statistics of a test image depart from that model.

This makes NIQE particularly convenient when subjective quality labels are unavailable. It can be applied without training on a dataset of distorted images and human opinion scores.

But the natural-image prior is also its weakness. A visually unusual image is not necessarily a poor-quality image. A synthetic scene, stylised photograph, unusual texture, or deliberately altered composition may deviate from the model without being perceptually objectionable.

NIQE also has no explicit mechanism for separating geometric deformation from other departures from natural image statistics. A warped image may receive a poor score, but the method does not tell us whether the score is caused by geometric misalignment, texture changes, or some other artifact.

The broader lesson from these early methods is that **detecting statistical abnormality and measuring perceptual quality are related, but they are not identical problems.**

### 4. Deep learning changes the picture

Handcrafted features eventually gave way to learned representations. Convolutional neural networks could learn more complex visual features, while supervised training allowed researchers to optimise models directly against human quality ratings.

The difficulty shifted from designing statistical features to designing useful training objectives, architectures, and datasets.

### 4.1. DBCNN: combining synthetic and authentic distortion knowledge

**Paper:** *Blind Image Quality Assessment Using a Deep Bilinear Convolutional Neural Network* — W. Zhang, K. Ma, J. Yan, D. Deng, and Z. Wang, IEEE Transactions on Image Processing, 2019.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img10.png)

DBCNN combines information from different feature branches to handle both synthetic and authentic distortions. Its bilinear architecture helps capture interactions between complementary feature representations.

The key motivation is practical: real-world photographs often contain several interacting artifacts, and a model trained exclusively on one kind of distortion may not generalise well to another.

DBCNN demonstrated that deep feature learning could substantially improve performance over many traditional methods, particularly on authentic-distortion benchmarks.

Its shortcomings include the dependence on training data and subjective labels, as well as the computational and architectural complexity of the network. Good performance on standard benchmarks does not guarantee reliable predictions on distortion types that are poorly represented during training.

It also does not explicitly recover a geometric transformation or produce a dedicated measure of local spatial displacement.

### 4.2. HyperIQA: adapting the predictor to the image

**Paper:** *Blindly Assess Image Quality in the Wild Guided by a Self-Adaptive Hyper Network* — S. Su, Q. Yan, Y. Zhu, C. Zhang, X. Ge, J. Sun, and Y. Zhang, CVPR 2020.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img11.png)

**HyperIQA** introduces a hypernetwork that generates image-specific quality-prediction parameters based on extracted image features.

The motivation is that the same distortion does not necessarily have the same perceptual effect on every image. A model should account for the content of the photograph instead of applying an identical prediction mechanism to all inputs.

This is an important step toward content-aware quality assessment, and **HyperIQA** has been widely used as a deep-learning baseline.

However, the generated predictor is still learned from the training distribution. It may not generalise reliably to unfamiliar content, unfamiliar distortion combinations, or geometric transformations absent from its training examples.

**HyperIQA** is content-adaptive, but content adaptation should not be confused with explicit geometric reasoning. The architecture does not directly estimate a deformation field or quantify how much individual structures have moved.

### 4.3. CONTRIQUE: learning quality representations through contrastive learning

**Paper:** *Image Quality Assessment Using Contrastive Learning* — P. C. Madhusudana, N. Birkbeck, Y. Wang, B. Adsumilli, and A. C. Bovik, IEEE Transactions on Image Processing, 2022.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img12.png)

**CONTRIQUE** is especially interesting because it changes how the quality representation is learned.

Rather than relying entirely on human-rated examples, the method uses an auxiliary task involving distortion type and degree. It then learns image representations through a contrastive objective. At evaluation time, the learned encoder can be kept frozen while a linear regressor maps the representation to quality scores.

This reduces the dependence on large collections of human-rated images for learning the visual representation itself.

**CONTRIQUE** reports competitive performance on both synthetic and authentic distortion benchmarks, making it a useful choice when considering general-purpose **NR-IQA**.

Still, contrastive learning does not automatically guarantee that the representation captures every perceptually important distortion. Its learned features reflect the training distortions, the construction of positive and negative examples, and the auxiliary objectives.

If geometric deformation is not represented appropriately in the learning process, the resulting embedding may not reliably separate a geometrically incorrect image from a correctly aligned image with similar pixel-level statistics.

The method learns a useful quality representation, but it does not explicitly estimate the geometric transformation responsible for a distortion.

> Transformers and the move toward richer visual representations

Transformers brought another change. Instead of relying primarily on local convolutional features, these models can capture relationships across different image regions and scales.

That is useful for IQA because perceptual quality is not always determined by isolated local artifacts. The relationship between image regions, the distribution of degradation, and the overall visual composition can all matter.

### 4.4. MUSIQ: preserving image resolution and aspect ratio

**Paper:** *MUSIQ: Multi-Scale Image Quality Transformer* — J. Ke, Q. Wang, Y. Wang, P. Milanfar, and F. Yang, ICCV 2021.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img13.png)

**MUSIQ** addresses a practical issue in image quality assessment: many neural networks expect fixed-size inputs, which means that images must be resized or cropped before inference.

Such preprocessing can remove useful details or change the apparent severity of a distortion.

**MUSIQ** uses a multi-scale representation and a transformer architecture designed to accommodate images with different resolutions and aspect ratios. It incorporates spatial and scale embeddings so that features from different scales can be processed together.

The method was evaluated on benchmarks including KonIQ-10k, SPAQ, and PaQ-2-PiQ. Its ability to work with native-resolution images makes it an appealing option for photographs in the wild.

The limitation is that preserving resolution does not solve every problem caused by preprocessing, nor does it guarantee that the model understands the geometric structure of a scene.

**MUSIQ** can learn to associate certain visual patterns with low quality, but it does not explicitly compare corresponding landmarks, recover a deformation field, or measure geometric inconsistency. Its predictions remain dependent on its learned representation and training distribution.

### 4.5. TReS: relative ranking and self-consistency

**Paper:** *No-Reference Image Quality Assessment via Transformers, Relative Ranking, and Self-Consistency* — S. A. Golestaneh, S. Dadsetan, and K. M. Kitani, WACV 2022.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img14.png)

**TReS** combines convolutional features with transformer-based representations to capture local and non-local image information.

It also uses relative ranking information during training. Rather than treating every image’s subjective score as an isolated regression target, it exploits relationships between the quality of different images.

Another important component is self-consistency. The authors investigate how quality predictions can become less stable under transformations such as horizontal flipping and use consistency constraints to improve robustness.

This is relevant to our discussion because a quality model should not change its opinion arbitrarily when an image undergoes a transformation that preserves its perceived quality.

However, self-consistency under a selected transformation is not equivalent to robustness under arbitrary geometric distortions. Horizontal flipping, translation, rotation, elastic deformation, and perspective warping are different operations with different perceptual consequences.

**TReS** improves the learning and consistency of quality predictions, but it does not provide a dedicated geometric distortion score or an explicit model of deformation.

### 4.6. MANIQA: modelling quality at multiple dimensions

**Paper:** *MANIQA: Multi-dimension Attention Network for No-Reference Image Quality Assessment* — S. Yang and colleagues, CVPR Workshops 2022.

**MANIQA** uses vision-transformer features and attention mechanisms to model relationships across image channels and spatial regions. Its architecture combines local and global interactions and uses patch-weighted quality prediction to produce an overall score.

The method was designed in part to improve perceptual quality assessment for challenging image degradations, including those associated with generative models.

One of its strengths is that it can learn that different patches contribute differently to the perceived quality of an image. This is more flexible than simply averaging local quality estimates.

There are still limitations. Attention maps are not necessarily explanations of the actual cause of poor quality, and a high-capacity transformer can remain sensitive to its training data and evaluation protocol.

Patch-level quality aggregation also does not directly establish whether image structures have been displaced or deformed. A spatially distorted image might receive a low score because its local features appear unusual, but **MANIQA** does not explicitly separate geometric error from other degradation.

### 4.7. ARNIQA: learning a distortion manifold

**Paper:** *ARNIQA: Learning Distortion Manifold for Image Quality Assessment* — L. Agnolucci, L. Galteri, M. Bertini, and A. Del Bimbo, WACV 2024.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img15.png)

**ARNIQA** takes a self-supervised approach to learning quality-related representations. It introduces a degradation-generation process that composes different distortions and trains the representation so that images subjected to similar degradation patterns have similar embeddings, even when their underlying content differs.

A linear regressor can then map the learned representation to quality scores without fine-tuning the encoder.

The attraction is that a model can learn from a broad range of synthetic degradation patterns without requiring human ratings for every training image.

But the phrase *distortion manifold* should not be interpreted as meaning that every possible image distortion is represented. The learned manifold depends on the degradation operators used to construct the training data and on the representation’s ability to generalise beyond those operators.

If geometric deformations are absent from the degradation process or insufficiently represented, the model has no guarantee of measuring them reliably. Learning a broad degradation representation is useful, but it is not the same as explicitly modelling geometric transformations.

### 5. What these papers have in common

The methods above differ considerably in architecture and training strategy. Some rely on natural-scene statistics, others learn features from human ratings, and newer approaches use contrastive learning, transformers, or self-supervised degradation models.

Yet a common pattern emerges.

<https://medium.com/media/68f7c5bfce319fdf3eae0b6197ca7663/href>

These are not criticisms unique to one particular architecture. They reflect a broader challenge in NR-IQA: a model can predict perceived quality well on the distribution it was trained and tested on without necessarily providing a reliable measurement of every possible distortion.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img16.png)

Most conventional NR-IQA research focuses on degradation categories such as:

- Additive noise and sensor noise.
- Gaussian or motion blur.
- JPEG and other compression artifacts.
- Changes in sharpness, contrast, and illumination.
- Complex mixtures of authentic image degradations.Z

### 6. The missing piece: geometric distortion is not just another pixel-level artifact

The pixel-level distortions can often be studied through changes in pixel values, local statistics, frequency content, or learned visual features. However, geometric distortions present a different challenge. They change the spatial arrangement of image content.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img17.png)

Examples include:

- **Translation:** the entire image or an object shifts from its original location.
- **Rotation:** the image or a region is rotated.
- **Perspective distortion:** spatial relationships change due to projective geometry.
- **Non-rigid deformation:** different image regions move by different amounts.
- **Local warping:** image structures are displaced according to a spatially varying transformation.

Consider a photograph of a building. The image may be perfectly sharp and almost noise-free, yet the building’s ***geometry*** could be distorted by a ***non-uniform warp***. A conventional NR-IQA model might still assign it a relatively **high score** if its learned features associate **sharpness** and **natural-looking texture** with **good quality**.

![](/images/blog/no-reference-image-quality-assessment-what-these-methods-can/img18.png)

The opposite can also happen. A ***geometrically transformed image*** might receive a **lower score** because its statistical characteristics differ from those encountered during training, even if the transformation is acceptable for the intended application.

This is the central limitation: **a quality score is not necessarily a measurement of geometric fidelity.**

There is also an important distinction between a method being sensitive to spatial changes and a method explicitly modelling them. A CNN or transformer can certainly respond to the pixel-level effects of a rotation, translation, or warp. It would be too strong to claim that existing NR-IQA models are completely blind to geometric changes.

The issue is that they generally do not estimate a transformation, quantify local displacement, or separate geometric error from photometric degradation as an explicit part of their quality-prediction objective.

That matters when the goal is not just to rank photographs by overall perceptual quality, but to determine whether the spatial structure of an image has been preserved.

### 7. What should a more suitable evaluation look like?

If the objective is to assess natural photographs corrupted by both noise and geometric distortion, evaluating only on conventional IQA benchmarks is not enough. A more informative evaluation would include controlled experiments with known transformations.

*For example*, one could start with clean natural photographs and generate separate test sets containing:

1. Noise at several intensities.
2. Translation and rotation at several magnitudes.
3. Perspective warping.
4. Smooth non-rigid deformation.
5. Combinations of noise and geometric distortion.

The experiment should distinguish between two objectives:

- **Perceptual quality:** How poor does the resulting image look to a human observer?
- **Geometric fidelity:** How much has the spatial arrangement of the scene changed?

These objectives are related, but they are not interchangeable. A small translation might be visually unimportant in one application and unacceptable in another. Similarly, a strong local deformation could be particularly damaging for tasks that depend on anatomical or structural alignment.

For evaluation, the usual NR-IQA metrics, including SRCC and PLCC, can measure agreement with human perceptual ratings. A separate geometric evaluation should measure agreement with known transformation magnitudes or an appropriate geometric-error target.

The evaluation protocol should also test generalisation to transformations that were not used during training. Otherwise, a model may simply learn the particular corruption patterns in the benchmark.

Finally, mixed-distortion experiments are essential. Noise and warping can interact: a model might respond strongly to noise while largely overlooking spatial deformation, or vice versa.

### 8. Final thoughts

NR-IQA has progressed from handcrafted statistical features to powerful learned representations. Methods such as BRISQUE and NIQE remain useful for lightweight assessment, while CONTRIQUE, MUSIQ, TReS, MANIQA, HyperIQA, and ARNIQA demonstrate how representation learning and modern architectures have expanded the field.

There is no single best method for every application. The appropriate choice depends on the type of images, the distortions of interest, the availability of training data, computational constraints, and how closely the benchmark reflects the intended use case.

For natural photographs affected by noise and spatial distortion, however, one question remains particularly important: is the model estimating overall perceptual quality, or is it also measuring the integrity of the image’s geometry?

Most general-purpose NR-IQA methods were not specifically designed to answer the second question. Their predictions may reflect geometric changes indirectly, but they do not generally provide an explicit measure of spatial deformation.

That gap is worth investigating. A system that combines perceptual quality estimation with a dedicated assessment of geometric distortion could offer a more informative evaluation than a single conventional NR-IQA score, particularly in applications where preserving spatial structure matters as much as preserving appearance.

### References and further reading

The following papers are good starting points for NR-IQA:

1. [Moorthy and Bovik — DIIVINE (2011)](https://doi.org/10.1109/TIP.2011.2109381?utm_source=chatgpt.com)
2. [Saad, Bovik, and Charrier — BLIINDS (2012)](https://doi.org/10.1109/TIP.2012.2191563?utm_source=chatgpt.com)
3. [Mittal, Moorthy, and Bovik — BRISQUE (2012)](https://doi.org/10.1109/TIP.2012.2214050?utm_source=chatgpt.com)
4. [Mittal, Soundararajan, and Bovik — NIQE (2013)](https://doi.org/10.1109/LSP.2012.2227726?utm_source=chatgpt.com)
5. [Zhang et al. — DBCNN (2019)](https://doi.org/10.1109/TIP.2018.2889959?utm_source=chatgpt.com)
6. [Su et al. — HyperIQA (CVPR 2020)](https://openaccess.thecvf.com/content_CVPR_2020/html/Su_Blindly_Assess_Image_Quality_in_the_Wild_Guided_by_a_Self-Adaptive_Hyper_Network_CVPR_2020_paper.html?utm_source=chatgpt.com)
7. [Madhusudana et al. — CONTRIQUE (2022)](https://doi.org/10.1109/TIP.2022.3181496?utm_source=chatgpt.com)
8. [Ke et al. — MUSIQ (ICCV 2021)](https://openaccess.thecvf.com/content/ICCV2021/html/Ke_MUSIQ_Multi-Scale_Image_Quality_Transformer_ICCV_2021_paper.html?utm_source=chatgpt.com)
9. [Golestaneh, Dadsetan, and Kitani — TReS (WACV 2022)](https://openaccess.thecvf.com/content/WACV2022/html/Golestaneh_No-Reference_Image_Quality_Assessment_via_Transformers_Relative_Ranking_and_Self-Consistency_WACV_2022_paper.html?utm_source=chatgpt.com)
10. [Yang et al. — MANIQA (2022)](https://arxiv.org/abs/2204.08958?utm_source=chatgpt.com)
11. [Agnolucci et al. — ARNIQA (WACV 2024)](https://openaccess.thecvf.com/content/WACV2024/html/Agnolucci_ARNIQA_Learning_Distortion_Manifold_for_Image_Quality_Assessment_WACV_2024_paper.html?utm_source=chatgpt.com)
12. [Mao et al. — No-Reference Image Quality Assessment: Past, Present, and Future (2025 survey)](https://onlinelibrary.wiley.com/doi/10.1111/exsy.13842?utm_source=chatgpt.com)

---

[No-Reference Image Quality Assessment: What These Methods Can (and Cannot) Tell Us](https://medium.com/the-owl/no-reference-image-quality-assessment-what-these-methods-can-and-cannot-tell-us-e68decfbaae1) was originally published in [The Owl](https://medium.com/the-owl) on Medium, where people are continuing the conversation by highlighting and responding to this story.

---
*Originally published on [Medium](https://medium.com/the-owl/no-reference-image-quality-assessment-what-these-methods-can-and-cannot-tell-us-e68decfbaae1).*

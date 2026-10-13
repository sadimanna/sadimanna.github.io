import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'posts');

// Category mapping defined explicitly based on title analysis
const categoryMapping = {
  "2018-02-22-converting-mnist-dataset-for-handwritten-digit-recognition-i.md": ["Computer Vision", "Python"],
  "2019-04-10-building-inception-resnet-v2-in-keras-from-scratch.md": ["Deep Learning", "Computer Vision"],
  "2020-03-20-k-fold-cross-validation-for-deep-learning-using-keras.md": ["Deep Learning", "Machine Learning"],
  "2020-04-11-using-telegram-bot-to-receive-deep-learning-model-training-u.md": ["Deep Learning", "Developer Tools"],
  "2020-06-06-welcome-to-the-owl-newsletters.md": ["Artificial Intelligence", "Research"],
  "2020-06-20-evaluation-metrics-part-1.md": ["Machine Learning", "Data Science"],
  "2020-06-25-statistical-learning-theory-part-1.md": ["Machine Learning", "Mathematics"],
  "2020-07-24-keras-vs-pytorch.md": ["Deep Learning", "Frameworks"],
  "2020-07-29-imbalanced-multilabel-scene-classification-using-keras.md": ["Deep Learning", "Computer Vision"],
  "2020-08-01-magnifying-dense-regions-in-matplotlib-plots.md": ["Data Visualization", "Python"],
  "2020-09-08-solving-integer-partitioning-problem-using-python.md": ["Algorithms", "Python"],
  "2020-12-20-extracting-features-from-an-intermediate-layer-of-a-pretrain.md": ["Deep Learning", "PyTorch"],
  "2021-01-07-extracting-features-from-an-intermediate-layer-of-a-pretrain.md": ["Deep Learning", "PyTorch"],
  "2021-01-09-using-forward-hooks-to-extract-intermediate-layer-outputs-fr.md": ["Deep Learning", "PyTorch"],
  "2021-06-21-statistical-learning-theory-part-4.md": ["Machine Learning", "Mathematics"],
  "2021-06-30-simclr-in-pytorch.md": ["Self-Supervised Learning", "Deep Learning"],
  "2021-07-30-plotting-grouped-bar-chart-in-matplotlib.md": ["Data Visualization", "Python"],
  "2021-07-31-gradcam-in-pytorch.md": ["Explainable AI", "Computer Vision"],
  "2021-08-01-plotting-stacked-bar-chart-in-python-using-matplotlib.md": ["Data Visualization", "Python"],
  "2021-08-21-creating-a-tf-dataset-using-a-data-generator.md": ["Deep Learning", "TensorFlow"],
  "2021-09-11-installing-pytorch-xla-in-google-colab-without-errors.md": ["PyTorch", "Developer Tools"],
  "2022-01-25-quick-tips-1-how-to-obtain-environment-information-using-pyt.md": ["PyTorch", "Developer Tools"],
  "2022-03-21-how-to-plot-multiple-2d-series-in-3d-waterfall-plot-in-matpl.md": ["Data Visualization", "Python"],
  "2022-08-25-how-to-get-model-summary-in-pytorch.md": ["Deep Learning", "PyTorch"],
  "2022-10-21-quick-tips-2-try-plotting-an-all-1s-2d-array-in-matplotlib.md": ["Data Visualization", "Python"],
  "2022-11-25-qr-factorization-gram-schmidt-algorithm.md": ["Mathematics", "Linear Algebra"],
  "2023-01-31-how-to-run-shell-scripts-in-windows.md": ["Developer Tools", "Shell"],
  "2023-06-09-an-elegant-way-to-split-a-dataset-into-train-validation-and.md": ["Data Science", "Developer Tools"],
  "2023-08-24-installing-detectron2-in-9-easy-steps.md": ["Computer Vision", "Developer Tools"],
  "2023-08-28-the-art-of-loading-custom-objects-and-functions-in-keras.md": ["Deep Learning", "Frameworks"],
  "2023-09-01-guide-to-fine-tuning-a-pre-trained-model-for-object-detectio.md": ["Computer Vision", "Deep Learning"],
  "2023-09-14-hosting-machine-learning-model-demos-with-hugging-face-space.md": ["Machine Learning", "Deployment"],
  "2023-09-27-changing-the-python-version-on-google-colab.md": ["Developer Tools", "Python"],
  "2023-10-06-does-this-occur-even-if-you-pull-the-nvidia-docker-image.md": ["Docker", "Developer Tools"],
  "2023-10-09-automating-ablation-studies-of-deep-learning-models-using-ba.md": ["Deep Learning", "Developer Tools"],
  "2024-04-08-the-most-pytorch-way-to-extract-output-from-any-intermediate.md": ["Deep Learning", "PyTorch"],
  "2024-04-11-how-to-save-both-logs-and-print-statement-outputs-in-the-sam.md": ["Python", "Developer Tools"],
  "2024-08-28-research-roundtable-day-1-paper-1-bert-bidirectional-encoder.md": ["Natural Language Processing", "Deep Learning"],
  "2024-08-28-research-roundtable-day-1-paper-2-big-self-supervised-models.md": ["Self-Supervised Learning", "Deep Learning"],
  "2024-11-20-sending-weights-biases-alerts-to-whatsapp-using-twilio.md": ["MLOps", "Developer Tools"],
  "2024-11-22-managing-your-machine-learning-workflow-with-weights-biases.md": ["MLOps", "Machine Learning"],
  "2024-12-05-how-to-log-metrics-and-data-at-different-lines-in-the-code-b.md": ["MLOps", "Machine Learning"],
  "2024-12-19-plotting-continuously-updating-gradient-vectors-on-loss-land.md": ["Data Visualization", "Optimization"],
  "2024-12-27-profiling-different-algorithms-using-the-built-in-timeit-mod.md": ["Python", "Performance"],
  "2025-01-10-chess-part-0-introduction-to-chess-programming-basics.md": ["Algorithms", "Game AI"],
  "2025-01-16-chess-part-1-establishing-communication-between-chess-engine.md": ["Algorithms", "Game AI"],
  "2025-02-14-neural-networks-part-0-a-journey-through-neural-network-arch.md": ["Deep Learning", "Neural Networks"],
  "2025-02-26-generative-models-diffusion-chapter-part-1-likelihood-and-sc.md": ["Generative AI", "Diffusion Models"],
  "2025-05-01-row-by-row-a-guide-to-iterating-over-pandas-dataframes-with.md": ["Data Science", "Python"],
  "2025-05-12-compressing-nii-files-to-nii-gz-a-guide-to-efficient-data-ma.md": ["Medical AI", "Medical Imaging"],
  "2025-05-20-understanding-and-calculating-macs-and-flops-in-pytorch-mode.md": ["Deep Learning", "Model Efficiency"],
  "2025-05-30-comprehensive-guide-to-overlaying-segmentation-masks-in-pyth.md": ["Computer Vision", "Python"],
  "2025-06-08-the-practical-guide-to-distributed-training-using-pytorch-pa.md": ["Distributed Training", "PyTorch"],
  "2025-06-09-the-practical-guide-to-distributed-training-using-pytorch-pa.md": ["Distributed Training", "PyTorch"],
  "2025-06-19-the-practical-guide-to-distributed-training-using-pytorch-pa.md": ["Distributed Training", "PyTorch"],
  "2025-06-26-the-practical-guide-to-distributed-training-using-pytorch-pa.md": ["Distributed Training", "High Performance Computing"],
  "2025-07-11-the-practical-guide-to-distributed-training-using-pytorch-pa.md": ["Distributed Training", "Deep Learning"],
  "2025-07-23-how-slurm-assigns-gpus-to-your-jobs.md": ["High Performance Computing", "GPU"],
  "2025-07-28-pushing-changes-to-a-new-private-repository-a-step-by-step-g.md": ["Git", "Version Control"],
  "2025-07-28-the-importance-of-branching-in-git.md": ["Git", "Version Control"],
  "2025-08-01-unlocking-the-power-of-shell-in-google-colab.md": ["Developer Tools", "Shell"],
  "2025-08-05-instantly-supercharge-your-ide-with-github-mcp-gitmcp-real-t.md": ["Developer Tools", "AI Tools"],
  "2025-08-07-how-to-split-a-centralized-dataset-for-federated-learning-si.md": ["Federated Learning", "Data Science"],
  "2025-08-21-low-bit-precision-training-in-pytorch-techniques-and-code-ex.md": ["Deep Learning", "Model Efficiency"],
  "2025-08-29-generating-a-gantt-chart-in-latex.md": ["LaTeX", "Productivity"],
  "2025-10-03-the-smart-way-to-copy-how-to-use-rsync-to-exclude-folders-ig.md": ["Linux", "Developer Tools"],
  "2025-12-22-deploying-a-next-js-static-site-to-github-pages.md": ["Web Development", "Deployment"],
  "2025-12-27-awesome-topics-fully-automated-research-paper-curation-on-gi.md": ["Automation", "Research"],
  "2025-12-28-awesome-topics-fully-automated-research-paper-curation-on-gi.md": ["Automation", "Research"],
  "2025-12-29-awesome-topics-fully-automated-research-paper-curation-on-gi.md": ["Automation", "Research"],
  "2025-12-31-writing-multi-line-commands-across-operating-systems.md": ["Developer Tools", "Shell"],
  "2026-01-02-git-basics-explained-part-1.md": ["Git", "Version Control"],
  "2026-01-03-introducing-the-awesome-topics-blog-series.md": ["Automation", "Research"],
  "2026-01-06-keeping-your-mac-lean-a-guide-to-upgrading-and-cleaning-pyth.md": ["Python", "Developer Tools"],
  "2026-01-14-mastering-logistic-regression-tackling-non-linear-data-with.md": ["Machine Learning", "Data Science"],
  "2026-01-29-how-to-remove-large-files-from-git-history.md": ["Git", "Version Control"],
  "2026-01-29-why-gitignore-didn-t-work.md": ["Git", "Version Control"],
  "2026-02-09-how-to-pull-changes-from-a-remote-git-repository.md": ["Git", "Version Control"],
  "2026-02-10-the-ghost-in-the-machine-tracking-variable-names-and-metadat.md": ["PyTorch", "Deep Learning"],
  "2026-02-25-cross-dataset-label-mapping-with-vision-language-embeddings.md": ["Computer Vision", "Vision-Language Models"],
  "2026-02-27-running-medgemma-4b-on-a-small-gpu-16gb-using-bitsandbytes.md": ["Medical AI", "Large Language Models"],
  "2026-02-27-running-medgemma-4b-on-cpu-or-using-gguf-llama-cpp.md": ["Medical AI", "Large Language Models"],
  "2026-02-28-hosting-your-own-llm-server.md": ["Large Language Models", "Deployment"],
  "2026-03-02-understanding-multipart-form-data-how-to-send-text-binary-da.md": ["Web Development", "Developer Tools"],
  "2026-03-17-updating-your-local-branch-from-a-specific-remote-branch-in.md": ["Git", "Version Control"],
  "2026-04-07-prove-that-2-n-1-is-divisible-by-3-for-all-odd-integers-n-1.md": ["Mathematics", "Algorithms"],
  "self-supervised-learning-medical-imaging.md": ["Medical AI", "Self-Supervised Learning"],
  "understanding-federated-learning.md": ["Machine Learning", "Federated Learning"]
};

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`Checking ${files.length} posts...`);
for (const file of files) {
  if (!categoryMapping[file]) {
    console.warn(`WARNING: Missing category mapping for ${file}`);
  }
}

// Function to update frontmatter while preserving original format and extra comments
function addCategoriesToFile(filePath, categories) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if categories already exists
  if (/^categories:\s*\[.*\]/m.test(content)) {
    return; // Already has categories
  }

  // Format categories line: categories: ["Cat 1", "Cat 2"]
  const categoriesLine = `categories: ${JSON.stringify(categories)}`;

  // Insert after date line if exists, else after title line, else before second ---
  let updated;
  if (/^date:.*$/m.test(content)) {
    updated = content.replace(/^(date:.*)$/m, `$1\n${categoriesLine}`);
  } else if (/^title:.*$/m.test(content)) {
    updated = content.replace(/^(title:.*)$/m, `$1\n${categoriesLine}`);
  } else {
    updated = content.replace(/^---/m, `---\n${categoriesLine}`);
  }

  fs.writeFileSync(filePath, updated, 'utf8');
}

let modifiedCount = 0;
for (const file of files) {
  const filePath = path.join(postsDir, file);
  const cats = categoryMapping[file];
  if (cats) {
    const raw = fs.readFileSync(filePath, 'utf8');
    if (!/^categories:\s*\[/m.test(raw)) {
      addCategoriesToFile(filePath, cats);
      modifiedCount++;
    }
  }
}

console.log(`Successfully added categories to ${modifiedCount} posts!`);

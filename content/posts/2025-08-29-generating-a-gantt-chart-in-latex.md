---
title: "Generating a Gantt Chart in LaTeX"
date: 2025-08-29
permalink: /blog/generating-a-gantt-chart-in-latex/
canonical_url: https://medium.com/@mannasiladittya/generating-a-gantt-chart-in-latex-857021bb7198
tags: [latex, gantt-chart, project-management, visualization]
---
---

![](/images/blog/generating-a-gantt-chart-in-latex/img1.jpeg)

You can create highly customizable Gantt charts in LaTeX using the `pgfgantt` package, which allows you to structure project timelines, phases, tasks, and milestones with fine control over layout and time slots. Here’s a comprehensive, step-by-step tutorial for making Gantt charts in LaTeX—including key details on using and not using time slot arguments.

### Step 1: Add the pgfgantt Package

Start by including the package in your LaTeX source preamble:


```text
\usepackage{pgfgantt}
```


The package provides all core commands for Gantt chart creation [2][3].

— -

### Step 2: Basic Gantt Chart Structure

Wrap your chart in the `ganttchart` environment and specify the time slot range:


```text
\begin{ganttchart}{1}{12}
  % chart tasks here
\end{ganttchart}
```


Here, `{1}{12}` means slots from 1 to 12 (for example: months, weeks, or custom units). Numeric slots offer flexibility and easy manual labeling [2][3].

— -

### Step 3: Adding Titles and Time Slot Labels

For clarity, label the time slots (top row) with custom text:


```text
\gantttitlelist{"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"}{1} \\
```


This creates a monthly timeline for each time slot. The value `{1}` means each label spans one slot [2].

If your slots represent weeks or quarters, change the labels to fit:


```text
\gantttitlelist{"Week 1","Week 2","Week 3","Week 4"}{1} \\
```


— -

### Step 4: Dividing Phases and Adding Tasks

Organize your schedule with groups (project phases) and bars (tasks):


```text
\ganttgroup{Planning}{1}{3} \\
\ganttbar{Requirement Analysis}{1}{1} \\
\ganttbar{Design}{2}{3} \\
```


Phases are marked with `\ganttgroup`, while `\ganttbar` creates each underlying task [3].

— -

### Step 5: Marking Milestones

Important points (like deliverables or checkpoints) are indicated with milestones:


```text
\ganttmilestone{Submit Proposal}{3} \\
```


Milestones are visually distinct, usually shown as diamonds or differently colored icons [2][3].

— -

### Step 6: Showing Progress and Dependencies

You can include progress on each task:


```text
\ganttbar[progress=50]{Implementation}{4}{8}
```


For dependencies between tasks, you need to name bars and add links:


```text
\ganttbar[name=taskA]{Data Collection}{4}{5}
\ganttbar[name=taskB]{Analysis}{6}{8}
\ganttlink{taskA}{taskB}
```


This draws an arrow from `taskA` to `taskB`, showing they are sequential [2][3].

— -

### Step 7: Custom Appearance

Use chart options to change gridlines, bar colors, and more:


```text
\begin{ganttchart}[
  hgrid, vgrid,
  x unit=0.6cm,
  y unit chart=0.5cm,
  bar/.append style={fill=blue!20},
  milestone/.append style={fill=red},
]{1}{12}
```


The options above fine-tune your chart’s appearance and spacing [2][3][5].

— -

### Step 8: Using the Time Slot Argument for Automatic Time Formats

If your project uses actual dates, months, or weeks, pgfgantt allows automatic labeling and slot mapping with `time slot format` and `time slot unit`:


```text
\begin{ganttchart}[
  time slot format=isodate-yearmonth,
  time slot unit=month
]{2023-01}{2023-12}
```


Here, the chart runs from January to December 2023, automatically labeling each slot with `YYYY-MM` [5][6]. You then use natural dates for tasks:


```text
\ganttbar{Development}{2023-03}{2023-10}
\ganttmilestone{Launch}{2023-12}
```


This approach is ideal for real-world planning and reduces manual errors in labeling [5][6].

— -

### Step 9: When NOT Using Time Slot Argument

If you use basic numeric slot ranges (e.g., `{1}{12}`), you are responsible for slot labeling and alignment to project timelines. This method is best for simple charts where units are abstract or you want full manual control.

Example:


```text
\begin{ganttchart}{1}{8}
\gantttitlelist{"Phase 1","Phase 2","Phase 3","Phase 4","Phase 5","Phase 6","Phase 7","Phase 8"}{1} \\
\ganttgroup{Initiation}{1}{2} \\
\ganttbar{Research}{1}{2} \\
% etc.
\end{ganttchart}
```


Numeric slots are flexible, but less precise for calendar or sequential mapping compared to date-based slots [2][3][5].

— -

### Example: Full Chart with Both Methods

**Manual Numeric Slots Example:**


```text
\begin{ganttchart}{1}{6}
  \gantttitlelist{"Jan","Feb","Mar","Apr","May","Jun"}{1} \\
  \ganttgroup{Planning}{1}{2} \\
  \ganttbar{Review}{1}{1} \\
  \ganttbar{Design}{2}{2} \\
  \ganttmilestone{Approve}{2} \\
  \ganttgroup{Execution}{3}{6} \\
  \ganttbar{Build}{3}{5} \\
  \ganttbar[progress=50]{Test}{6}{6}
\end{ganttchart}
```


**Automatic Calendar Slots Example:**


```text
\begin{ganttchart}[
    time slot format=isodate-yearmonth,
    time slot unit=month
]{2024-01}{2024-06}
  \ganttgroup{Planning}{2024-01}{2024-02} \\
  \ganttbar{Review}{2024-01}{2024-01} \\
  \ganttmilestone{Approve}{2024-02} \\
  \ganttgroup{Execution}{2024-03}{2024-06} \\
  \ganttbar{Build}{2024-03}{2024-05} \\
  \ganttbar[progress=50]{Test}{2024-06}{2024-06}
\end{ganttchart}
```


The second example makes maintenance and real-time project tracking far easier when dates are relevant.

— -

### Advanced Tips

* Use `progress label node anchor` to customize progress labels.
* Adjust grid thickness, bar height, group color, and milestone icons for presentation needs.
* For long projects, break charts into pages, or zoom in with `x unit` for better detail [2][5][6].
* Explore documentation for adding resources, formatting week columns, or aligning with project reporting standards [2][5][6].

— -

Here are two additional steps for your tutorial blog article, focusing on customizing individual `ganttmilestone` and `ganttbar` objects in LaTeX's `pgfgantt` package.

— -

### Step 10: Customizing an Individual Gantt Bar

You can modify the appearance of a specific `ganttbar` by adding options inside its square brackets. This allows you to make one task stand out—such as coloring it differently, adjusting its height, or changing its progress label position.

**Example:**


```text
\ganttbar[
  bar/.append style={fill=orange, draw=black}, % Custom color and border
  progress=80,                                 % 80% complete
  bar height=0.35,                             % Taller bar
  bar progress label node/.append style={right=4pt, text=blue}
]{Critically Important Task}{4}{6}
```


In this example, the bar is orange, has a black border, is higher than default, shows 80% progress, and displays the progress label in blue to the right. Each style and option affects only this task bar.

— -

### Step 11: Customizing an Individual Milestone

Likewise, you can tailor a `ganttmilestone` object to highlight key moments by altering its color, shape, and label formatting.

**Example:**


```text
\ganttmilestone[
  milestone/.append style={fill=red, shape=star, minimum size=7pt}, % Red, star-shaped milestone
  milestone label font=\bfseries\color{red},                      % Bold, red milestone label
  milestone height=0.3                                             % Larger milestone symbol
]{Deadline}{8}
```


Here, the milestone appears as a star (alternatives include diamond or rectangle shapes), is filled red, and its label appears bold and red. The minimum size and height make it more prominent on the chart.

— -

**Tip:**   
These customizations can be mixed and matched with other options provided by `pgfgantt`. For more advanced adjustments, consult the [pgfgantt documentation](https://texdoc.org/serve/pgfgantt/0) for details on styles and parameter usage.

— -

By customizing tasks and milestones individually, you can visually emphasize important periods, deadlines, or risks in your LaTeX Gantt charts — making your project management documentation far more effective and engaging.

### Conclusion

LaTeX’s `pgfgantt` package empowers you to create detailed, flexible Gantt charts suited for robust academic, research, or industry project planning. Numeric slot arguments keep things simple for short or abstract charts, while time slot formatting provides precision for real-world schedules. Customization extends from layout and color to dependency tracking and completion indicators, ensuring your Gantt chart fits every project need [2][3][5][6].

For more inspiration and sample templates, see Overleaf templates [2] and the package documentation.

— -

**References**   
[1] <https://tex.stackexchange.com/questions/344323/how-to-create-a-gantt-chart>   
[2] <https://www.overleaf.com/latex/examples/gantt-charts-with-the-pgfgantt-package/jmkwfxrnfxnw>   
[3] <https://tex.stackexchange.com/questions/63877/gantt-chart-package>   
[4] <https://tex.stackexchange.com/questions/364944/expand-a-gantt-chart-automatically-to-textwidth-of-a-page>   
[5] <https://www.dickimaw-books.com/latex/admin/html/gantt.shtml>   
[6] <https://tex.stackexchange.com/questions/402440/pgfgantt-how-to-customize-week-columns-in-a-gantt-chart-or-other-ideas>

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/generating-a-gantt-chart-in-latex-857021bb7198).*

'use server';
/**
 * @fileOverview A Genkit flow for generating in-depth technical analysis for projects.
 *
 * - generateProjectInsight - A function that handles the project insight generation process.
 * - ProjectInsightGeneratorInput - The input type for the generateProjectInsight function.
 * - ProjectInsightGeneratorOutput - The return type for the generateProjectInsight function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectInsightGeneratorInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().describe('A detailed description of the project, including its purpose, technologies, and outcomes.'),
  projectTags: z.array(z.string()).describe('A list of tags associated with the project (e.g., AI, ML, Computer Vision).'),
});
export type ProjectInsightGeneratorInput = z.infer<typeof ProjectInsightGeneratorInputSchema>;

const ProjectInsightGeneratorOutputSchema = z.object({
  insight: z.string().describe('A comprehensive technical analysis and deep summary of the project.'),
});
export type ProjectInsightGeneratorOutput = z.infer<typeof ProjectInsightGeneratorOutputSchema>;

export async function generateProjectInsight(input: ProjectInsightGeneratorInput): Promise<ProjectInsightGeneratorOutput> {
  return projectInsightGeneratorFlow(input);
}

const projectInsightPrompt = ai.definePrompt({
  name: 'projectInsightPrompt',
  input: { schema: ProjectInsightGeneratorInputSchema },
  output: { schema: ProjectInsightGeneratorOutputSchema },
  prompt: `You are a Senior AI Research Engineer providing a deep technical analysis of a project for a technical peer review or a high-level engineering interview.

Your task is to provide an in-depth, thorough technical evaluation of the project. Do not be overly concise; instead, focus on providing meaningful technical substance.

Analyze the following aspects:
1. Architecture & Methodology: Evaluate the specific approach (e.g., SE-CNN, Attention mechanisms).
2. Data & Preprocessing: Insights on the dataset scale and processing pipeline.
3. Performance Metrics: Analyze the significance of results like 88.55% accuracy.
4. Technical Significance: Why this project matters in its specific field (e.g., Healthcare CV).

Project Name: {{{projectName}}}
Project Description: {{{projectDescription}}}
Project Tags: {{#each projectTags}}- {{{this}}}
{{/each}}

Please provide a deep, detailed technical analysis:`,
});

const projectInsightGeneratorFlow = ai.defineFlow(
  {
    name: 'projectInsightGeneratorFlow',
    inputSchema: ProjectInsightGeneratorInputSchema,
    outputSchema: ProjectInsightGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await projectInsightPrompt(input);
    return output!;
  }
);
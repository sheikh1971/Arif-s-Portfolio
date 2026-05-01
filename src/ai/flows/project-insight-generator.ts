'use server';
/**
 * @fileOverview A Genkit flow for generating concise summaries or key technical insights for projects.
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
  insight: z.string().describe('A concise summary or key technical insights about the project.'),
});
export type ProjectInsightGeneratorOutput = z.infer<typeof ProjectInsightGeneratorOutputSchema>;

export async function generateProjectInsight(input: ProjectInsightGeneratorInput): Promise<ProjectInsightGeneratorOutput> {
  return projectInsightGeneratorFlow(input);
}

const projectInsightPrompt = ai.definePrompt({
  name: 'projectInsightPrompt',
  input: { schema: ProjectInsightGeneratorInputSchema },
  output: { schema: ProjectInsightGeneratorOutputSchema },
  prompt: `You are an expert technical evaluator assisting a potential employer in quickly understanding a project from a software engineering portfolio.
Your task is to provide a concise summary or highlight the most important technical insights of the following project.
Focus on the technical aspects, methodologies used, and potential impact.
Do not invent information.

Project Name: {{{projectName}}}
Project Description: {{{projectDescription}}}
Project Tags: {{#each projectTags}}- {{{this}}}
{{/each}}

Please provide a summary or technical insights that would be valuable for an employer to quickly grasp the project's essence:`,
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

import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';

export default async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const tag = core.getInput('tag', { required: true });
    let owner = core.getInput('owner');
    let repo = core.getInput('repo');
    const octokit = getOctokit(token);

    if (!token) {
      core.setFailed('GitHub token is required.');
      return;
    }
    if (!owner || owner === '') {
      core.debug(`No owner provided, using ${context.repo.owner}`);
      owner = context.repo.owner;
    }
    if (!repo || repo === '') {
      core.debug(`No repo provided, using ${context.repo.repo}`);
      repo = context.repo.repo;
    }

    const release = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });

    core.setOutput('data', JSON.parse(JSON.stringify(release.data)));
  } catch (error) {
    core.setOutput('data', JSON.parse('{ id: 0 }'));
    core.debug(`Release not found.`);
  }
}

if (require.main === module) {
  run();
}

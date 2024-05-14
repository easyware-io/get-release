import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';

export default async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token', { required: true });
    const tag = core.getInput('release', { required: true });
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

    core.info(`Release: ${JSON.stringify(release)}`);

    if (release.data.prerelease) {
      core.setOutput('is-pre-release', 'true');
      core.debug('The release is still a pre-release.');
    } else {
      core.setOutput('is-pre-release', 'false');
      core.debug('The release is not a pre-release.');
    }
  } catch (error) {
    core.setOutput('is-pre-release', 'invalid');
    if (error instanceof Error) core.setFailed(`Failed get release: ${error.message}`);
  }
}

if (require.main === module) {
  run();
}

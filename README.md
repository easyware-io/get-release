# easyware-io/get-release@v1

![CI](https://github.com/easyware-io/get-release/actions/workflows/build.yml/badge.svg)

Gets the release data from GitHub for a specific release based on the release tag.

## Usage

### Basic usage

```yaml
- name: Get release
  uses: easyware-io/get-release@v1
  with:
    release: v1.0.0
    token: ${{ secrets.GITHUB_TOKEN }}
    owner: <optional>
    repo: <optional>
```

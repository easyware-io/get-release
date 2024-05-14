# easyware-io/is-pre-release@v1

![CI](https://github.com/easyware-io/is-pre-release/actions/workflows/build.yml/badge.svg)

Detects if a release is still a pre-release.

## Usage

### Basic usage

```yaml
- name: Detects if a release is still a pre-release.
  uses: easyware-io/is-pre-release@v1
  with:
    release: v1.0.0
    token: ${{ secrets.GITHUB_TOKEN }}
    owner: <optional>
    repo: <optional>
```

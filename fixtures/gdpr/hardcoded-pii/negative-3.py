def normalize_repo(url: str) -> str:
    ssh = re.match(r"^[\w.-]+@([^:]+):(.+)$", url)  # git@github.com:owner/repo
    assert normalize_repo("https://x-access-token:ghp_secret@github.com/o/r.git") == "o/r"
    assert normalize_repo("git@github.com:o/r.git") == "o/r"
    return url

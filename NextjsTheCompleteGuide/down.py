import os
import requests

def download_file(url, local_filename):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename

def download_github_folder(repo, folder_path, local_dir):
    api_url = f"https://api.github.com/repos/{repo}/contents/{folder_path}"
    headers = {'Accept': 'application/vnd.github.v3+json'}
    response = requests.get(api_url, headers=headers)
    response.raise_for_status()
    contents = response.json()

    if not os.path.exists(local_dir):
        os.makedirs(local_dir)

    for item in contents:
        if item['type'] == 'file':
            file_url = item['download_url']
            local_file_path = os.path.join(local_dir, item['name'])
            print(f"Downloading {file_url} to {local_file_path}")
            download_file(file_url, local_file_path)
        elif item['type'] == 'dir':
            new_folder_path = os.path.join(folder_path, item['name'])
            new_local_dir = os.path.join(local_dir, item['name'])
            download_github_folder(repo, new_folder_path, new_local_dir)

if __name__ == "__main__":
    repo = "mschwarzmueller/nextjs-complete-guide-course-resources"
    folder_path = "code/03-routing-rendering/05-basic-parallel-route/public/images"
    local_dir = "images"
    download_github_folder(repo, folder_path, local_dir)


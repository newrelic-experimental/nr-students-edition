import os
from typing import List

# Those variables change to your paths
PATH = ""
PREFIX = ""
PATH_TO_SAVE_DOMAINS = ""
list_of_domains: List = []


for root, subdirs, files in os.walk(PATH):
    current_path = root.removeprefix(PREFIX).split("/")
    reversed_current_path = current_path[::-1]
    result = " ".join([str(x) for x in reversed_current_path])

    list_of_domains.append(result)

for domain in list_of_domains:
    domain = domain.replace(" ", ".")

    with open(PATH_TO_SAVE_DOMAINS, 'a') as file:
        if '.' in domain:
            file.write(domain + '\n')

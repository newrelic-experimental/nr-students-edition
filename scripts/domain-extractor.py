from dataclasses import replace
from genericpath import isdir
import os
import sys
from typing import List
from xml import dom

PATH = "/Users/dmar/New-Relic/jetbrains-swot/lib/domains"
PREFIX = "/Users/dmar/New-Relic/jetbrains-swot/lib/domains/"
PATH_TO_SAVE_DOMAINS = ""
list_of_domains: List = []


for root, subdirs, files in os.walk(PATH):
    current_path = root.removeprefix(PREFIX)
    current_path = current_path.split("/")
    reversed_current_path = current_path[::-1]
    result = " ".join([str(x) for x in reversed_current_path])

    list_of_domains.append(result)

    print(f"Current Path: {reversed_current_path}")


for domain in list_of_domains:
    domain = domain.replace(" ", ".")
    print(domain)

    with open('./domains', 'a') as file:
        if '.' in domain:
            file.write(domain + '\n')

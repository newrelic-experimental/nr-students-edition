from genericpath import isdir
import os
import sys
import pathlib

PATH = "/Users/dmar/New-Relic/jetbrains-swot/lib/domains"


# print([name for name in os.listdir(PATH) if os.path.isdir(name)])
# print([os.path.abspath(name) for name in os.listdir(PATH) if os.path.isdir(name)])

# domains = sorted(os.listdir(PATH))

# for path, subdirs, files in os.walk(PATH):
#     for name in files:
#         print(pathlib.PurePath(path, name).name.removesuffix(".txt"))

for root, subdirs, files in os.walk(PATH):
    pass


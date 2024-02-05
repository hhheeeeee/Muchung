FROM ubuntu:latest
LABEL authors="snoop"

ENTRYPOINT ["top", "-b"]
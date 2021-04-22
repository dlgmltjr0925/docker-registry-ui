# Docker Registry UI

This is a web project that can manage a private docker registry.

## How to use it?

```bash
git clone https://github.com/dlgmltjr0925/docker-registry-web
cd docker-registry-web

yarn
yarn build
yarn start
```

#### Docker

```
docker run -d -p 3000:3000 --name docker-registry-web dlgmltjr0925/docker-registry-web:latest
```

#### Kubernetes

```
kubectl apply -f https://raw.githubusercontent.com/dlgmltjr0925/docker-registry-web/master/kubernetes-deployment.yaml
```

#### TODO

1. Remove blob files

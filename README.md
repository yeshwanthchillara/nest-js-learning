# Task Management - Kubernetes Setup

## Prerequisites

Install:

* Docker
* kubectl
* Kind

Verify installation:

```bash
docker --version
kubectl version --client
kind version
```

---

# Start the Kubernetes Cluster

Create the Kind cluster:

```bash
kind create cluster --name task-management --config infra/kind-cluster.yaml
```

Verify cluster:

```bash
kubectl cluster-info
kubectl get nodes
```

Expected:

```text
task-management-control-plane
task-management-worker
task-management-worker2
```

---

# Deploy the Application

Apply all Kubernetes resources:

```bash
kubectl apply -k k8s
```

Resources created:

* Deployment
* Service
* ConfigMap
* Secrets
* Certificate Secret

Verify:

```bash
kubectl get all
```

---

# Update Deployment After Changes

Re-apply configuration:

```bash
kubectl apply -k k8s
```

Restart deployment:

```bash
kubectl rollout restart deployment task-management
```

---

# Delete and Recreate Pods

Delete all application pods:

```bash
kubectl delete pod --all
```

Deployment will automatically recreate them.

---

# Cluster Operations

## Get Cluster Information

```bash
kubectl cluster-info
```

## Get Nodes

```bash
kubectl get nodes
```

## Get All Resources

```bash
kubectl get all
```

## Get Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

# Pod Operations

## List Pods

```bash
kubectl get pods
```

## Detailed Pod Information

```bash
kubectl describe pod <POD_NAME>
```

Example:

```bash
kubectl describe pod task-management-xxxxx
```

## View Pod Logs

```bash
kubectl logs <POD_NAME>
```

Follow logs:

```bash
kubectl logs -f <POD_NAME>
```

## Connect to Pod Shell

```bash
kubectl exec -it <POD_NAME> -- sh
```

---

# Service Operations

## List Services

```bash
kubectl get svc
```

## Describe Service

```bash
kubectl describe svc <SERVICE_NAME>
```

Example:

```bash
kubectl describe svc task-management-service
```

---

# ConfigMap Operations

## List ConfigMaps

```bash
kubectl get configmaps
```

## Describe ConfigMap

```bash
kubectl describe configmap <CONFIGMAP_NAME>
```

Example:

```bash
kubectl describe configmap task-management-app-config
```

---

# Secret Operations

## List Secrets

```bash
kubectl get secrets
```

## Describe Secret

```bash
kubectl describe secret <SECRET_NAME>
```

Example:

```bash
kubectl describe secret task-management-secret
```

---

# Metrics

View pod CPU and memory usage:

```bash
kubectl top pods
```

View node CPU and memory usage:

```bash
kubectl top nodes
```

> Requires Metrics Server installation.

---

# Debugging

## Check Deployment Status

```bash
kubectl get deployments
```

## Check ReplicaSets

```bash
kubectl get replicasets
```

## Check Service Endpoints

```bash
kubectl get endpoints
```

## Render Kustomize Resources Without Applying

```bash
kubectl kustomize k8s
```

Useful for validating manifests before deployment.

---

# Verify Configuration Inside Pod

Connect to the pod:

```bash
kubectl exec -it <POD_NAME> -- sh
```

## Verify Certificate Secret

```bash
ls -l /secrets
```

Expected:

```text
ca.pem -> ..data/ca.pem
```

Read certificate:

```bash
cat /secrets/ca.pem | head
```

Expected:

```text
-----BEGIN CERTIFICATE-----
```

---

## Verify Database Configuration

```bash
env | grep DB_
```

---

## Verify JWT Configuration

```bash
env | grep JWT
```

---

## Verify ConfigMap Values

```bash
env
```

or

```bash
printenv
```

---

# Cleanup

Delete application resources:

```bash
kubectl delete -k k8s
```

Delete cluster:

```bash
kind delete cluster --name task-management
```

Verify:

```bash
kind get clusters
```

Expected:

```text
No clusters found.
```

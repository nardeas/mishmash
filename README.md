# Mishmash

> TODO: description

## Development

**Create a virtualenv with python >=3.10.1**
```
pyenv install 3.10.1
pyenv virtualenv 3.10.1 <name of the virtualenv>
```

**Install project packages**
```
pip install -r requirements.txt
pip install -e .
```

**Run api server**
```
OPENAPI_KEY= uvicorn api:app --reload
OPENAPI_KEY= uvicorn api:app
```

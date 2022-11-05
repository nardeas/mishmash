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

**Run api**
```
uvicorn api:app --reload
uvicorn api:app
```

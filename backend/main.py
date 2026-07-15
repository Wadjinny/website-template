from fastapi import FastAPI

from routes.hello import router as hello_router

app = FastAPI()

app.include_router(hello_router)


def main():
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=1234, reload=True)


if __name__ == "__main__":
    main()

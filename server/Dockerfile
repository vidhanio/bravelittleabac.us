FROM golang:1.18-rc-alpine

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o /app/bin/server ./cmd/server

CMD [ "/app/bin/server" ]

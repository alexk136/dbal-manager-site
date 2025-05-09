FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache fish

COPY package*.json ./

RUN npm install
RUN npm install @radix-ui/react-dropdown-menu lucide-react

EXPOSE 3000
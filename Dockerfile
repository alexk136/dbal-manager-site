FROM node:18-alpine

WORKDIR /app

# Ставим fish, если нужно
RUN apk add --no-cache fish

# Копируем только зависимости (для кэширования)
COPY package*.json ./

RUN npm install
RUN npm install @radix-ui/react-dropdown-menu lucide-react

# Остальное будет подмонтировано volume’ом

EXPOSE 3000
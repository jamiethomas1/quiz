# Stage 1: Build the application
FROM composer:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy only the composer files to the container
COPY composer.json composer.lock ./

# Copy the rest of the application files
COPY . .

# Install composer dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Stage 2: Create the final image
FROM php:8.2-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the application files from the build stage
COPY --from=build /app /var/www/html

# Set the proper permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 and start PHP-FPM
EXPOSE 9000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]

FROM httpd:alpine
COPY my.conf /usr/local/apache2/conf/httpd.conf
COPY vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
COPY certs /usr/local/apache2/conf/certs
EXPOSE 88
EXPOSE 443

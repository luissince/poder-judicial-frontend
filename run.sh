docker stop poder-judicial && docker rm poder-judicial

docker image rm poder-judicial

docker build -t poder-judicial .

docker run -d \
--restart always \
--name poder-judicial \
--net=luis \
-p 5000:80 \
poder-judicial

docker stop intranet-upla && docker rm intranet-upla

docker image rm intranet-upla

docker build -t intranet-upla .

docker run -d \
--restart always \
--name intranet-upla \
--net=upla \
-p 5000:80 \
intranet-upla

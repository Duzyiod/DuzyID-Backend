# Docker networking comand

NETWORK="duzyid"
IPZONE="172.21"

if [ ! "$(docker network ls | grep $NETWORK)" ]; then
    echo "Creating ${NETWORK} network ..."
    docker network create \
        --subnet=$IPZONE.0.0/16 \
        --gateway=$IPZONE.0.1 \
        --ip-range=$IPZONE.0.0/24 \
        -o com.docker.network.bridge.enable_icc=true \
        -o com.docker.network.bridge.host_binding_ipv4=0.0.0.0 \
        -o com.docker.network.bridge.enable_ip_masquerade=true \
        -o com.docker.network.bridge.name=duzyid0 \
        -o com.docker.network.driver.mtu=1500 \
        \
        $NETWORK

else
    echo "${NETWORK} network already exists."
fi

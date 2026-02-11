package ip

import (
	"fmt"
	"net"
)

func GetLocalIP() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", fmt.Errorf("failed to get interface addresses: %w", err)
	}

	for _, addr := range addrs {
		ipNet, ok := addr.(*net.IPNet)
		if !ok {
			continue
		}

		if ipNet.IP.IsLoopback() || ipNet.IP.To4() == nil {
			continue
		}

		return ipNet.IP.String(), nil
	}

	return "", fmt.Errorf("no suitable LAN IP address found")
}

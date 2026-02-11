package ip

import (
    "fmt"
    "net"
    "strings"
)

func GetLocalIP() (string, error) {
    addrs, err := net.InterfaceAddrs()
    if err != nil {
        return "", err
    }

    var candidates []string

    for _, addr := range addrs {
        ipNet, ok := addr.(*net.IPNet)
        if !ok {
            continue
        }

        if !ipNet.IP.IsLoopback() && ipNet.IP.To4() != nil {
            ip := ipNet.IP.String()

            if strings.HasPrefix(ip, "10.") {
                return ip, nil 
            }

            if strings.HasPrefix(ip, "192.168.") {
                if !strings.HasSuffix(ip, ".1") {
                    candidates = append(candidates, ip)
                }
            }

            candidates = append(candidates, ip)
        }
    }

    if len(candidates) > 0 {
        return candidates[0], nil
    }

    return "", fmt.Errorf("no suitable LAN IP address found")
}
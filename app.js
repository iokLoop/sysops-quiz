'use strict';

// ============================================================
// CATEGORIES
// ============================================================
const CATS = {
  networking: { label: 'Networking',                 css: 'net', color: '#1f6feb' },
  linux:      { label: 'Linux',                      css: 'lin', color: '#3fb950' },
  windows:    { label: 'Windows',                    css: 'win', color: '#58a6ff' },
  hardware:   { label: 'Hardware / RAID / Storage',  css: 'hw',  color: '#f0883e' },
  web:        { label: 'Web & Protocols',            css: 'web', color: '#bc8cff' },
};

// ============================================================
// QUESTION BANK  (70 questions)
// ============================================================
const Q = [
  // ── NETWORKING ──────────────────────────────────────────
  { id:'n01', cat:'networking',
    q:'Which OSI layer does the IP (Internet Protocol) operate at?',
    o:['Layer 1 – Physical','Layer 2 – Data Link','Layer 3 – Network','Layer 4 – Transport'],
    a:2, x:'IP operates at Layer 3 (Network). It handles logical addressing (IP addresses) and routing packets between networks. TCP/UDP live at Layer 4.' },
  { id:'n02', cat:'networking',
    q:'What is the primary purpose of STP (Spanning Tree Protocol)?',
    o:['Auto-assign IP addresses','Prevent Layer 2 broadcast storms and loops by blocking redundant paths','Translate private IPs to public IPs','Route traffic between VLANs'],
    a:1, x:'STP (IEEE 802.1D) prevents loops in redundant L2 topologies by putting redundant ports in Blocking state. Without STP a single broadcast would loop forever (broadcast storm).' },
  { id:'n03', cat:'networking',
    q:'A user can ping 8.8.8.8 but NO website opens by name. Most likely cause?',
    o:['NIC hardware failure','Default gateway is down','DNS resolution failure','Firewall blocking HTTPS (port 443)'],
    a:2, x:'Pinging 8.8.8.8 (an IP) works → L3 routing is fine. Failing to open websites BY NAME → DNS is the problem. Check: ipconfig /all (Win) or /etc/resolv.conf (Linux). Try: nslookup google.com.' },
  { id:'n04', cat:'networking',
    q:'BGP (Border Gateway Protocol) is the routing protocol of the internet. It routes between:',
    o:['VLANs on the same switch','Subnets inside one company','Autonomous Systems (ASes) — different organizations on the internet','Hosts and their default gateway'],
    a:2, x:'BGP is an EGP (Exterior Gateway Protocol). Each organization, ISP, or cloud provider is an Autonomous System (AS) with a unique AS number. BGP uses TCP port 179 and makes path-selection decisions based on attributes (AS-PATH, MED, LOCAL_PREF).' },
  { id:'n05', cat:'networking',
    q:'What does ARP (Address Resolution Protocol) do?',
    o:['Assigns IP addresses to hosts automatically','Resolves IP addresses → MAC addresses on the local network','Translates domain names → IP addresses','Encrypts network traffic'],
    a:1, x:'When a host knows the IP but not the MAC address of the next hop, it broadcasts an ARP Request ("Who has 192.168.1.1?"). The owner replies with its MAC. The result is cached in the ARP table (arp -a).' },
  { id:'n06', cat:'networking',
    q:'Devices on VLAN 10 cannot communicate with devices on VLAN 20. What is required?',
    o:['Add more switch ports','A Layer 3 device (router or L3 switch with SVIs) to route between VLANs','Configure SNMP traps','Disable STP on the switch'],
    a:1, x:'VLANs are Layer 2 broadcast domains. Routing between VLANs requires Layer 3. Options: (1) Router-on-a-stick with subinterfaces, (2) L3 switch with SVIs (Switch Virtual Interfaces). Each VLAN needs an IP gateway on the L3 device.' },
  { id:'n07', cat:'networking',
    q:'What port does HTTPS use by default?',
    o:['Port 80','Port 8080','Port 443','Port 8443'],
    a:2, x:'HTTPS = HTTP over TLS/SSL → TCP port 443. HTTP = port 80. Common alternates: 8080 (HTTP-alt), 8443 (HTTPS-alt). Remember: FTP=20/21, SSH=22, Telnet=23, SMTP=25, DNS=53, HTTP=80, HTTPS=443.' },
  { id:'n08', cat:'networking',
    q:'OSPF uses which algorithm to compute the best route?',
    o:['Bellman-Ford (distance vector, used by RIP)','Dijkstra SPF (Shortest Path First)','BGP path attributes','EIGRP DUAL (Diffusing Update Algorithm)'],
    a:1, x:'OSPF is a link-state protocol. Each router builds a complete topology map (LSDB). Dijkstra\'s SPF algorithm then calculates the shortest (lowest-cost) path to each destination. Converges faster than RIP; supports VLSM and areas.' },
  { id:'n09', cat:'networking',
    q:'What does NAT (Network Address Translation) accomplish?',
    o:['Assigns IPs via DHCP','Monitors devices via SNMP','Translates private RFC-1918 IPs to one or more public IPs so multiple hosts can share internet access','Segments networks into VLANs'],
    a:2, x:'PAT (Port Address Translation / NAT Overload) is the most common form — it maps thousands of private (192.168.x, 10.x, 172.16.x) sessions to a single public IP using different source ports. Configured on the border router/firewall.' },
  { id:'n10', cat:'networking',
    q:'UDP is preferred over TCP for certain applications. Which is the best reason?',
    o:['UDP is always faster because it uses less bandwidth','UDP is connectionless and lower overhead — better for latency-sensitive apps (VoIP, DNS, video streaming, gaming)','UDP has stronger error correction than TCP','UDP supports more concurrent connections than TCP'],
    a:1, x:'UDP (User Datagram Protocol) has no connection setup, no acknowledgement, no retransmission. Lower overhead but no guaranteed delivery. Used where speed and low latency matter more than reliability: DNS (single query/response), VoIP, live video, gaming.' },
  { id:'n11', cat:'networking',
    q:'What process does DHCP use to assign IP configuration to a new host? (acronym)',
    o:['SLAAC — Stateless Address Autoconfiguration','DORA — Discover, Offer, Request, Acknowledge','ARP — Address Resolution Protocol','SYN-ACK — TCP Handshake'],
    a:1, x:'DHCP DORA: (1) Client broadcasts DHCP Discover, (2) Server responds DHCP Offer (proposed IP), (3) Client broadcasts DHCP Request (accepts offer), (4) Server sends DHCP Acknowledge (lease confirmed). Uses UDP 67 (server) and 68 (client).' },
  { id:'n12', cat:'networking',
    q:'What is a trunk port on a network switch?',
    o:['A port connected to a single end-user device in one VLAN','A port that carries traffic for MULTIPLE VLANs using 802.1Q tags','A management-only port reserved for SNMP','A port blocked by STP for loop prevention'],
    a:1, x:'802.1Q trunk ports carry tagged frames for multiple VLANs between switches and to routers. The 4-byte 802.1Q header contains the VLAN ID. Access ports are untagged (single VLAN, connected to end devices). Trunk = inter-switch / switch-router links.' },
  { id:'n13', cat:'networking',
    q:'You need to increase bandwidth AND add redundancy between two core switches. Which feature bundles physical links into one logical link?',
    o:['STP (Spanning Tree Protocol)','LACP / Port-Channel / Link Aggregation (802.3ad)','OSPF load balancing','VLAN Trunking'],
    a:1, x:'LACP (Link Aggregation Control Protocol, 802.3ad) creates a LAG (Link Aggregation Group) by bundling multiple physical links. Provides combined bandwidth and automatic failover if one link fails. Called: EtherChannel (Cisco), Bond (Linux), NIC Teaming (Windows).' },
  { id:'n14', cat:'networking',
    q:'What is the subnet mask and usable host count for a /24 network?',
    o:['255.0.0.0 — 16,777,214 hosts','255.255.0.0 — 65,534 hosts','255.255.255.0 — 254 usable hosts','255.255.255.128 — 126 hosts'],
    a:2, x:'/24 = 24 network bits, 8 host bits = 256 addresses total, 254 usable (subtract network and broadcast). Mask: 255.255.255.0. A /25 = 126 hosts. /30 = 2 hosts (point-to-point links).' },
  { id:'n15', cat:'networking',
    q:'SNMP (Simple Network Management Protocol) is used for:',
    o:['Spanning tree convergence on switches','Monitoring and managing network devices — collecting metrics (CPU, interfaces, errors) and sending traps on events','Routing between Autonomous Systems','Assigning VLANs to switch ports'],
    a:1, x:'SNMP uses a Manager/Agent model. Agents run on devices; Manager polls via GET (UDP 161) or receives TRAP notifications (UDP 162). Versions: v1/v2c (community strings, insecure), v3 (authentication + encryption). Tools: Zabbix, Nagios, PRTG, LibreNMS.' },

  // ── LINUX ───────────────────────────────────────────────
  { id:'l01', cat:'linux',
    q:'What does chmod 755 mean for a file or directory?',
    o:['Owner: rw-, Group: r--, Others: r--  (644)','Owner: rwx, Group: r-x, Others: r-x','Owner: rwx, Group: rwx, Others: rwx  (777)','Owner: rw-, Group: rw-, Others: r--  (664)'],
    a:1, x:'Octal 755 = 7(owner:rwx) 5(group:r-x) 5(others:r-x). Standard for directories and executables. The owner can read/write/execute; group and others can read and execute but NOT write. Private key files should use 600 (owner rw only).' },
  { id:'l02', cat:'linux',
    q:'Which command shows ALL listening TCP/UDP ports with their owning process?',
    o:['ps aux','df -h','ss -tulpn','top -b'],
    a:2, x:'ss -tulpn: -t=TCP, -u=UDP, -l=listening only, -p=show process, -n=numeric (no DNS reverse lookup). Modern replacement for netstat. Also works: netstat -tulpn (install net-tools) or lsof -i -P -n | grep LISTEN.' },
  { id:'l03', cat:'linux',
    q:'How do you make a systemd service start automatically on every system boot?',
    o:['systemctl start myservice','systemctl enable myservice (creates boot symlink)','service myservice autostart','crontab @reboot myservice'],
    a:1, x:'systemctl enable creates symlinks in the appropriate systemd target directory so the service starts at boot. systemctl start only starts it NOW for this session. Best practice: systemctl enable --now myservice (enables AND starts immediately).' },
  { id:'l04', cat:'linux',
    q:'What does kill -9 <PID> do, and when should you prefer kill -15 first?',
    o:['kill -9 = graceful stop (SIGTERM); kill -15 = force kill','kill -9 sends SIGKILL (unblockable force-kill); use kill -15 (SIGTERM) first to allow the process to clean up files and connections','kill -9 pauses the process; kill -15 resumes it','Both signals do the same thing on modern Linux'],
    a:1, x:'SIGTERM (15) asks the process to shut down gracefully — it can catch this signal, save state, and exit cleanly. SIGKILL (9) is sent directly by the kernel — the process cannot catch or ignore it. Always try SIGTERM first to avoid data corruption.' },
  { id:'l05', cat:'linux',
    q:'Which file configures which DNS servers the OS uses for name resolution?',
    o:['/etc/hosts (static hostname mappings)','/etc/resolv.conf (nameserver entries)','~/.bashrc (environment variables)','/etc/network/interfaces (interface config)'],
    a:1, x:'/etc/resolv.conf contains "nameserver 8.8.8.8" entries. /etc/hosts is for static local overrides (checked first). On systemd-resolved systems, /etc/resolv.conf may be a symlink. nsswitch.conf controls the resolution order.' },
  { id:'l06', cat:'linux',
    q:'What does the sticky bit accomplish on the /tmp directory (chmod 1777 /tmp)?',
    o:['Files in /tmp are automatically deleted on reboot','Any user can create files there, but ONLY the file\'s owner (or root) can delete their own files','Files cannot be executed from /tmp','The directory is hidden from normal users'],
    a:1, x:'Without sticky bit, any user with write permission on a directory can delete any file in it. With sticky bit: only the file owner, directory owner, or root can delete files. Critical for shared directories like /tmp to prevent users from deleting each other\'s files.' },
  { id:'l07', cat:'linux',
    q:'How do you search for the string "ERROR" in all files under /var/log recursively?',
    o:['find /var/log -name "ERROR"','grep -r "ERROR" /var/log','cat /var/log/* | grep ERROR','ls -la /var/log | grep ERROR'],
    a:1, x:'grep -r (recursive) searches through all files in a directory tree. Useful flags: -i (case-insensitive), -n (show line numbers), -l (only filenames), --include="*.log" (filter by extension). For large log files use: grep -r "ERROR" /var/log 2>/dev/null' },
  { id:'l08', cat:'linux',
    q:'What does df -h display?',
    o:['Processes sorted by CPU usage (use top for that)','Free RAM and swap in MB (use free -m for that)','Disk space per mounted filesystem in human-readable units (GB/MB)','All open network sockets'],
    a:2, x:'df -h (disk free, human-readable): shows each mounted filesystem with Size/Used/Avail/Use%/Mounted-on. To check a directory\'s total size use: du -sh /path. To find large files: find / -type f -size +1G 2>/dev/null.' },
  { id:'l09', cat:'linux',
    q:'What is the correct way to find a file named "nginx.conf" anywhere on the system?',
    o:['grep -r nginx.conf /','find / -name "nginx.conf" 2>/dev/null','locate nginx.conf (only works if locate DB is current)','Both b and c are valid approaches for different situations'],
    a:3, x:'find / -name "nginx.conf" searches in real-time (always accurate, can be slow). locate uses a database updated by updatedb (fast, but may be stale after file was created). Both are valid — use find when you need current results, locate for speed.' },
  { id:'l10', cat:'linux',
    q:'A service is failing. Which command follows its logs in real time?',
    o:['ps aux | grep servicename','journalctl -u servicename -f','df -h | grep servicename','top | grep servicename'],
    a:1, x:'journalctl -u <service> -f follows (like tail -f) logs for a systemd unit. Useful flags: -xe (extra context + jump to end), --since="1 hour ago", --no-pager. For older syslog: tail -f /var/log/syslog | grep servicename.' },

  // ── WINDOWS ─────────────────────────────────────────────
  { id:'w01', cat:'windows',
    q:'In Windows Event Viewer (Security log), Event ID 4625 indicates:',
    o:['Successful user logon (that\'s Event ID 4624)','System shutdown','Failed logon attempt — includes failure reason and source IP','A service started successfully'],
    a:2, x:'Security event IDs to memorize: 4624=Successful logon, 4625=Failed logon, 4648=Logon with explicit credentials, 4720=User account created, 4732=User added to security group. Found in: Event Viewer → Windows Logs → Security.' },
  { id:'w02', cat:'windows',
    q:'How do you find which process is using port 8080 on Windows?',
    o:['ipconfig /all | findstr 8080','netstat -ano | findstr :8080 — then tasklist | findstr <PID>','ping localhost:8080','tracert :8080'],
    a:1, x:'netstat -ano shows all connections with PIDs (-a=all, -n=numeric, -o=PID). Filter with findstr :8080. Then use "tasklist | findstr <PID>" to get the process name. GUI alternative: Resource Monitor → Network tab → Listening Ports.' },
  { id:'w03', cat:'windows',
    q:'What does sfc /scannow do? (System File Checker)',
    o:['Scans all network ports for vulnerabilities','Scans protected Windows system files and repairs corrupted ones from the component store','Scans for malware and removes it','Shows storage disk usage statistics'],
    a:1, x:'SFC scans Windows protected system files and replaces corrupted ones from the Windows Component Store (WinSxS). Run as Administrator. If SFC reports errors it cannot fix: DISM /Online /Cleanup-Image /RestoreHealth repairs the component store first, then run SFC again.' },
  { id:'w04', cat:'windows',
    q:'A service won\'t start — Error 1067 "The process terminated unexpectedly." First step?',
    o:['Reinstall Windows','Check Event Viewer → Windows Logs → System AND Application for error details around the failure time','Run ipconfig /flushdns','Disable Windows Firewall temporarily'],
    a:1, x:'Event Viewer is ALWAYS the first tool for service failures. The System and Application logs will contain the specific error code and reason. Right-click Computer → Manage → Event Viewer, or run: eventvwr.msc. Filter by date and error/critical level.' },
  { id:'w05', cat:'windows',
    q:'What is the difference between HKLM and HKCU in the Windows Registry?',
    o:['HKLM = file settings; HKCU = network settings','HKLM (HKEY_LOCAL_MACHINE) = machine-wide settings for ALL users; HKCU (HKEY_CURRENT_USER) = settings for the currently logged-in user only','HKLM is read-only; HKCU is writable','No practical difference — they store the same data'],
    a:1, x:'HKLM changes affect all users on the machine (software installs, services, drivers). HKCU changes affect only the current user (desktop settings, user-specific app config). GPOs typically write to HKLM for computer policies and HKCU for user policies.' },
  { id:'w06', cat:'windows',
    q:'Which PowerShell cmdlet is the equivalent of ping?',
    o:['Get-Process','Test-Connection -ComputerName google.com -Count 4','Get-NetIPAddress','Invoke-WebRequest'],
    a:1, x:'Test-Connection sends ICMP Echo Requests and returns PowerShell objects (not just text), making it scriptable. Example: if (Test-Connection google.com -Count 1 -Quiet) { "Online" }. Also try: Test-NetConnection -ComputerName host -Port 443 (tests TCP port too).' },
  { id:'w07', cat:'windows',
    q:'What is the correct command to flush the DNS cache on Windows?',
    o:['nslookup /flush','ipconfig /flushdns','netsh reset dns','dns-cache clear'],
    a:1, x:'ipconfig /flushdns clears the DNS Resolver Cache. Also works: net stop dnscache && net start dnscache. After flushing, DNS queries will go to the configured DNS server instead of using cached results. Check cache: ipconfig /displaydns.' },
  { id:'w08', cat:'windows',
    q:'What does msconfig (System Configuration utility) let you configure?',
    o:['Monitors real-time CPU and memory (that\'s Task Manager)','Boot options (safe mode, boot log), which services and startup programs run at boot, diagnostic modes','Edits the Registry directly (that\'s regedit)','Configures Windows Firewall rules (that\'s wf.msc)'],
    a:1, x:'msconfig is useful for: switching to Safe Mode, Clean Boot (disabling 3rd-party services to troubleshoot), enabling boot logging. Note: in Windows 8+, startup programs moved to Task Manager → Startup tab. msconfig still manages boot and services.' },
  { id:'w09', cat:'windows',
    q:'What is the purpose of Group Policy (GPO) in a Windows Active Directory domain?',
    o:['Manage physical hardware and drivers','Centrally manage security settings, software deployment, scripts, and desktop config for users and computers in the domain','Monitor real-time network performance','Configure RAID arrays on domain servers'],
    a:1, x:'GPOs are linked to AD containers (site, domain, OU) and apply settings to user/computer objects. Examples: password policy, USB restrictions, mapped drives, software installation, proxy settings, screensaver policy. Edited with gpedit.msc or Group Policy Management Console.' },
  { id:'w10', cat:'windows',
    q:'A Windows server shows 100% Disk I/O in Task Manager. What is the best next tool?',
    o:['Registry Editor — edit disk driver settings','Resource Monitor (resmon.exe) → Disk tab → see which process is causing the I/O','Event Viewer — check Event ID 4625','ipconfig /flushdns'],
    a:1, x:'Resource Monitor gives per-process I/O details: read/write bytes/sec, which files are being accessed. Task Manager only shows totals. Also try: perfmon.msc for long-term counters. In PowerShell: Get-Process | Sort-Object WorkingSet -Descending | Select -First 10.' },

  // ── HARDWARE / RAID / STORAGE ────────────────────────────
  { id:'h01', cat:'hardware',
    q:'RAID 0 (Striping) — which statement is correct?',
    o:['Mirrors data for redundancy; can survive 1 disk failure','Stripes data across all disks for maximum performance — NO fault tolerance. ONE disk failure = total data loss','Requires minimum 4 disks and uses parity','Combines mirroring and striping for performance + redundancy'],
    a:1, x:'RAID 0 splits data across all drives (striping). Read/write speed scales with number of disks. But there is ZERO redundancy — if ANY single disk fails, ALL data is lost (no parity, no mirror). Use only for scratch/temp/non-critical data where speed is paramount.' },
  { id:'h02', cat:'hardware',
    q:'RAID 1 (Mirroring) — which statement is correct?',
    o:['Stripes data with distributed parity (that\'s RAID 5)','Writes identical data to 2 disks simultaneously; survives 1 disk failure; usable capacity = 50%','Requires minimum 4 disks','Combines RAID 1 and RAID 0 (that\'s RAID 10)'],
    a:1, x:'RAID 1 keeps exact copies. If one disk dies, the other continues serving data. Usable capacity = 50% of total (1 of 2 disks). Read performance can be improved by reading different blocks from each disk. Excellent for OS drives and critical small datasets.' },
  { id:'h03', cat:'hardware',
    q:'RAID 5 — minimum disks required and fault tolerance?',
    o:['Minimum 2 disks; tolerates 2 simultaneous failures','Minimum 3 disks; tolerates 1 disk failure (distributed parity)','Minimum 4 disks; tolerates 2 disk failures (that\'s RAID 6)','Minimum 3 disks; tolerates 2 disk failures'],
    a:1, x:'RAID 5 distributes parity across all disks (no dedicated parity disk). Min 3 disks. Usable = (N-1) disks. Survives 1 failure. Warning: during rebuild on large drives there\'s risk of an Unrecoverable Read Error (URE) which would cause data loss. RAID 6 is safer for large arrays.' },
  { id:'h04', cat:'hardware',
    q:'What is the KEY advantage of RAID 6 over RAID 5?',
    o:['RAID 6 is significantly faster than RAID 5','RAID 6 uses less disk space than RAID 5','RAID 6 tolerates 2 simultaneous disk failures (dual distributed parity)','RAID 6 requires fewer disks than RAID 5'],
    a:2, x:'RAID 6 uses double parity — two independent parity calculations (P and Q). Min 4 disks. Usable = (N-2) disks. Survives any 2 simultaneous disk failures. Recommended for arrays with many large disks (>4TB) where rebuild time increases URE risk. Write penalty is higher than RAID 5.' },
  { id:'h05', cat:'hardware',
    q:'RAID 10 (1+0) — minimum disks and fault tolerance?',
    o:['Minimum 2 disks; tolerates 1 failure','Minimum 3 disks; tolerates 1 failure per group','Minimum 4 disks; can tolerate 1 failure per mirrored pair (potentially multiple failures if in different pairs)','Minimum 6 disks; tolerates 3 failures'],
    a:2, x:'RAID 10 = stripes across mirrored pairs. 4 disks → 2 mirrored pairs. Each pair can lose 1 disk. Could lose 2 disks if they\'re in different pairs (best case). Usable = 50%. Excellent read performance, good write performance, good redundancy. Popular for high-performance databases (Oracle, SQL Server).' },
  { id:'h06', cat:'hardware',
    q:'What is ECC RAM and why is it mandatory in production servers?',
    o:['Extended Cache Controller — speeds up CPU L3 cache access','Error-Correcting Code — detects and automatically corrects single-bit memory errors, preventing crashes and data corruption','Encrypted Cache Control — encrypts data stored in RAM for security','Enhanced Core Controller — manages multi-core CPU scheduling'],
    a:1, x:'DRAM bits can randomly flip (cosmic rays, thermal noise). ECC adds extra bits to detect 2-bit errors and silently correct 1-bit errors. Without ECC, a bit flip in a server can cause kernel panic, silent data corruption, or security vulnerabilities. All enterprise server CPUs (Intel Xeon, AMD EPYC) and boards support ECC.' },
  { id:'h07', cat:'hardware',
    q:'What is the difference between RDIMM and UDIMM?',
    o:['RDIMM is faster; UDIMM is more power-efficient','RDIMM (Registered/Buffered DIMM) has a register chip that buffers signals — allows more DIMMs per memory channel for large RAM configs. UDIMM is unbuffered, used in workstations/desktops (max ~2 DIMMs/channel)','UDIMM supports ECC; RDIMM does not','They are physically identical and interchangeable'],
    a:1, x:'Server memory channels have electrical load limits. RDIMM\'s register chip acts as a buffer, reducing the load on the memory controller and allowing 2-4 DIMMs per channel (LRDIMM goes even further). Enterprise servers use RDIMMs to support large RAM configs (2TB+). RDIMMs and UDIMMs cannot be mixed.' },
  { id:'h08', cat:'hardware',
    q:'What is the main performance difference between NVMe SSD and SATA SSD?',
    o:['NVMe drives are physically smaller (M.2 form factor only)','NVMe uses the PCIe bus — achieves 5–7 GB/s sequential read vs SATA\'s ~550 MB/s limit, with much lower latency (microseconds vs hundreds of microseconds)','NVMe drives are cheaper per GB than SATA','NVMe supports more RAID levels than SATA'],
    a:1, x:'SATA III bottleneck: ~600 MB/s (effective ~550 MB/s). NVMe over PCIe 4.0: 5-7 GB/s sequential. PCIe 5.0: 10+ GB/s. NVMe form factors: M.2, U.2 (enterprise), PCIe add-in card. NVMe also has much lower queue depth overhead. Use NVMe for databases and high-IOPS workloads.' },
  { id:'h09', cat:'hardware',
    q:'In enterprise datacenters, why is SAS preferred over SATA for critical storage?',
    o:['SAS drives are always faster than SATA in sequential throughput','SAS has dual-port architecture for redundant host paths, higher MTBF ratings, support for SAS expanders, and better performance consistency under mixed workloads','SAS is cheaper per TB than SATA','SAS drives have larger capacities than SATA'],
    a:1, x:'Key SAS advantages: (1) Dual-port — two independent paths to storage (path failover if one HBA or cable fails), (2) Higher MTBF (1.2M vs 700K hours), (3) SAS expanders allow large JBOD shelves (hundreds of disks), (4) Better IOPS consistency under mixed read/write. SATA is single-port — no dual-path failover.' },
  { id:'h10', cat:'hardware',
    q:'SAN vs NAS — which best describes the difference?',
    o:['SAN = file-level over Ethernet; NAS = block-level over Fibre Channel (reversed)','SAN provides BLOCK-level storage over dedicated network (FC or iSCSI) — server sees a raw disk. NAS provides FILE-level access (NFS, SMB/CIFS) over standard Ethernet.','They are the same technology with different marketing names','SAN is only for backups; NAS is for primary storage'],
    a:1, x:'SAN (Storage Area Network): block device presented to server via FC or iSCSI — OS formats it with a filesystem (ext4, NTFS, VMFS). High performance, used for VMs, databases. NAS (Network-Attached Storage): file share accessed via NFS (Linux) or SMB (Windows) — simpler, shared access. Many DCs use both.' },
  { id:'h11', cat:'hardware',
    q:'What is IPMI / iDRAC (Dell) / iLO (HP) and why is it critical in a datacenter?',
    o:['A software RAID management tool installed in the OS','A dedicated BMC (Baseboard Management Controller) providing out-of-band server management — power control, remote console, hardware health — INDEPENDENT of the OS state','A network monitoring agent for switches and routers','A type of memory error correction controller'],
    a:1, x:'The BMC is a separate microcontroller on the motherboard with its own NIC and power. It works even when the OS is crashed or server is powered off. Capabilities: virtual KVM console, virtual media (mount ISO remotely), power on/off/reset, hardware sensors (temperature, fan, PSU), hardware RAID management. Essential for remote "lights-out" datacenter management.' },
  { id:'h12', cat:'hardware',
    q:'What does "1U" mean in datacenter rack terminology?',
    o:['1 unit = 1 meter of rack height','1 rack unit (U or RU) = 1.75 inches (44.45 mm) of vertical rack space','1 unit = 1 power supply module','1 unit = 1 Gbps of network capacity'],
    a:1, x:'Standard 19-inch racks are measured in U (rack units). 1U = 1.75". Standard full rack = 42U (sometimes 45U or 48U). Common server form factors: 1U (dense/edge servers), 2U (mid-range), 4U (GPU workloads, large storage). Blade servers use a chassis (e.g., 10U) that holds multiple blade modules.' },
  { id:'h13', cat:'hardware',
    q:'What is hot-swap storage capability?',
    o:['The ability to run disks at high temperature without thermal throttling','Replacing a failed disk while the server is running in production — no power down required. RAID controller detects and begins automatic rebuild.','Using SSDs instead of spinning disks in a running system','Swapping the entire server unit without downtime'],
    a:1, x:'Hot-swap (hot-plug) drives connect via SAS/SATA backplane. The RAID controller detects removal and insertion automatically. The rebuild begins as soon as the new drive is inserted. Hot spare: a blank drive pre-inserted and waiting — rebuild starts automatically the moment a failure is detected, even faster than manual hot-swap.' },
  { id:'h14', cat:'hardware',
    q:'What is iSCSI?',
    o:['A fiber optic connector standard (that\'s LC, SC, MPO)','A RAID level combining striping and mirroring','Block-level storage protocol that carries SCSI commands over TCP/IP Ethernet networks — lower-cost alternative to Fibre Channel SAN','An out-of-band server management protocol (that\'s IPMI)'],
    a:2, x:'iSCSI encapsulates SCSI block I/O in TCP/IP packets. Uses standard Ethernet infrastructure (cheaper than FC). Software iSCSI initiator runs on the server OS; hardware iSCSI HBA offloads processing. Dedicated iSCSI VLAN recommended. Common in mid-range SANs, VMware datastores, and cloud storage gateways.' },
  { id:'h15', cat:'hardware',
    q:'What does a redundant PSU configuration provide in a server?',
    o:['Double the power to increase CPU and GPU performance','High availability — if one PSU fails the other takes over with zero downtime. Each PSU should connect to a different PDU/circuit.','Increased power efficiency through load sharing','Backup power for the storage subsystem only'],
    a:1, x:'N+1 redundancy: one PSU handles full load, second is on standby. 2N: each PSU independently handles 100% load. Best practice: connect PSU-A to PDU-A (UPS circuit A) and PSU-B to PDU-B (UPS circuit B). Monitor PSU health via iDRAC/iLO. Server continues operating during PSU replacement (hot-swap PSUs).' },
  { id:'h16', cat:'hardware',
    q:'DDR5 vs DDR4 RAM — which improvements does DDR5 bring?',
    o:['DDR5 fits the same socket as DDR4 (backward compatible)','DDR5: higher data rate (4800–8400+ MT/s vs 3200 MT/s), lower voltage (1.1V vs 1.2V), on-die ECC per module, dual 32-bit channels per DIMM, higher per-DIMM capacity (up to 256GB)','DDR5 has worse error correction than DDR4 ECC','DDR5 is only for gaming PCs — servers still use DDR4'],
    a:1, x:'DDR5 requires compatible CPU (Intel 12th+ gen, AMD Zen 4+) and motherboard — NOT backward compatible. On-die ECC in DDR5 is per-module error correction (separate from system-level ECC RDIMM). Enterprise DDR5 RDIMMs combine both. Intel Xeon Sapphire Rapids and AMD EPYC Genoa use DDR5.' },
  { id:'h17', cat:'hardware',
    q:'What does IOPS measure and why is it critical for database performance?',
    o:['Internet Operations Per Second — measures WAN throughput','Input/Output Operations Per Second — measures random read/write operations per second. Databases generate millions of small random I/Os.','Integrated Operations Protocol Suite — a datacenter certification standard','Measures average power consumption of storage devices'],
    a:1, x:'IOPS benchmarks: 7200 RPM HDD ≈ 80–150 IOPS; 15K RPM SAS HDD ≈ 250 IOPS; Enterprise SAS SSD ≈ 100K+ IOPS; NVMe SSD ≈ 500K–2M+ IOPS. Databases (Oracle, PostgreSQL, SQL Server) are IOPS-bound. Sequential throughput (MB/s) matters more for backups and large file streaming.' },
  { id:'h18', cat:'hardware',
    q:'What is Fibre Channel (FC) and when is it the preferred SAN protocol?',
    o:['Consumer fiber internet access (FTTH — Fiber To The Home)','A high-speed dedicated storage networking protocol (8/16/32 Gbps) for enterprise SANs — lossless, deterministic, very low latency. Required for mission-critical storage (databases, tier-1 VMs).','A RAID implementation using fiber optic connections between disks','A load balancing protocol for clustering web servers'],
    a:1, x:'FC is a purpose-built storage networking technology. FC uses HBAs in servers and FC switches (fabric). Features: lossless (buffer-to-buffer credits prevent frame drops), sub-millisecond latency, 32/64 Gbps per port. More complex and expensive than iSCSI but offers better performance guarantees for the most demanding workloads.' },
  { id:'h19', cat:'hardware',
    q:'What is the key difference between an Online (double-conversion) UPS and a Line-Interactive UPS?',
    o:['Online UPS is less reliable and only used for small deployments','Online (double-conversion): power ALWAYS flows AC→DC→battery→inverter→AC — zero transfer time, cleanest power, highest protection. Line-interactive: brief ~4ms transfer to battery on power loss.','Line-interactive provides better protection against power surges','There is no practical difference for datacenter use'],
    a:1, x:'Double-conversion UPS: server always runs from inverter — completely isolated from utility power anomalies (surges, sags, frequency variations). Zero transfer time. Higher cost and slightly lower efficiency. Line-interactive: handles minor fluctuations with voltage regulation (AVR); only transfers to battery on complete power loss. Double-conversion preferred for sensitive IT equipment.' },
  { id:'h20', cat:'hardware',
    q:'What is PXE boot and how is it used in a datacenter?',
    o:['Pre-eXecution Environment — boots a server over the network (via DHCP + TFTP) before any OS is installed. Used for automated OS provisioning and diskless booting.','A type of disk partition scheme (MBR vs GPT)','Remote management console access through IPMI','Load balancing incoming connections across a server farm'],
    a:0, x:'PXE (Preboot eXecution Environment) process: (1) Server PXEs, sends DHCP request, (2) DHCP server points to TFTP server, (3) Server downloads bootstrap (pxelinux.0), (4) OS installer/image delivered over network. Used with: Cobbler, Foreman, WDS (Windows), FOG Project. Essential for large-scale datacenter provisioning.' },
  { id:'h21', cat:'hardware',
    q:'What are the two types of hypervisors and how do they differ?',
    o:['Type 1 = software hypervisor; Type 2 = hardware hypervisor','Type 1 (bare-metal): runs DIRECTLY on hardware — no host OS (VMware ESXi, Microsoft Hyper-V, KVM/Linux, Xen). Type 2 (hosted): runs on top of a host OS (VirtualBox, VMware Workstation, Parallels).','Type 1 is for servers; Type 2 is for network equipment','Type 1 and Type 2 refer to 32-bit and 64-bit virtualization respectively'],
    a:1, x:'Type 1 has direct access to hardware — better performance, used in production datacenters. VMware ESXi, Microsoft Hyper-V (embedded in Windows Server), and KVM (Linux kernel module) are all Type 1. Type 2 runs inside an existing OS — more overhead, used for development/testing/desktops.' },
  { id:'h22', cat:'hardware',
    q:'What is vMotion (VMware) / Live Migration (Hyper-V)?',
    o:['Migrating VM files (VMDK) to a different datastore while the VM is offline','Moving a running virtual machine from one physical host to another with ZERO downtime — memory, network connections, and storage all transfer live','Creating a snapshot of a running VM for backup purposes','Cloning a virtual machine to create an identical copy'],
    a:1, x:'Live migration uses memory pre-copy (pages copied while VM runs, final delta sync, brief handoff — typically <1 second interruption). Requirements (VMware vMotion): shared storage (SAN/NAS or vSAN), 10GbE+ network, compatible CPU generations, vCenter. Critical for maintenance windows — patch host, vMotion VMs away, never take downtime.' },
  { id:'h23', cat:'hardware',
    q:'Docker containers vs Virtual Machines — key architectural difference?',
    o:['Containers are slower than VMs in all workloads','Containers share the HOST OS kernel — no hypervisor overhead, instant startup (~ms), smaller footprint. VMs include a full guest OS — stronger isolation, seconds to boot, heavier (GBs).','VMs are more portable than containers across cloud platforms','Containers require more memory than VMs to run the same application'],
    a:1, x:'Container: app + libraries + dependencies in an isolated namespace. Shares host kernel. Lightweight (MBs), fast startup, ideal for microservices. VM: full OS + hypervisor = stronger isolation, heavier. In practice: containers run INSIDE VMs in production (Kubernetes on VMs). Containers don\'t replace VMs — they complement them.' },
  { id:'h24', cat:'hardware',
    q:'What is VMware HA (High Availability) and what does it protect against?',
    o:['Prevents VM performance degradation during peak hours (that\'s DRS)','Automatically restarts VMs on surviving hosts when a HOST fails — typically within 1-2 minutes. Requires shared storage (SAN/NAS/vSAN) and vCenter.','Allows live migration of VMs between hosts (that\'s vMotion)','Protects against storage corruption and data loss (that\'s vSAN)'],
    a:1, x:'VMware HA monitors host heartbeats. If a host fails (no heartbeat for ~15 seconds), HA selects a surviving host and powers on the VMs from shared storage. Requires all hosts to have access to shared storage (VMFS datastore on SAN, NAS, or vSAN). RTO ≈ 2-5 minutes. FT (Fault Tolerance) provides zero-downtime protection for single VMs.' },
  { id:'h25', cat:'hardware',
    q:'What is the difference between a hot spare and a cold spare disk in RAID?',
    o:['Hot spare = faster SAS disk; cold spare = slower SATA disk','Hot spare: a blank disk pre-installed and online — the RAID controller automatically begins rebuild immediately when failure detected. Cold spare: a replacement disk kept in stock — must be manually installed.','Hot spare = disk kept at high temperature for fast response; cold spare = disk at room temperature','There is no functional difference — both require manual intervention'],
    a:1, x:'Hot spare (global or dedicated) eliminates the time between detection and rebuild start. The controller detects the failure, marks the failed drive, and immediately starts copying data to the hot spare — all automatically. This reduces the window of vulnerability (time with reduced redundancy). Cold spare requires someone to physically arrive and install the replacement disk.' },

  // ── WEB & PROTOCOLS ─────────────────────────────────────
  { id:'p01', cat:'web',
    q:'Correct order of DNS resolution when you type a URL in the browser:',
    o:['Root NS → TLD NS → Authoritative NS → Browser cache','Browser cache → OS hosts file → Local DNS resolver cache → Recursive resolver → Root NS → TLD NS → Authoritative NS','Authoritative NS → ISP DNS → Browser cache → Root NS','Browser cache → Authoritative NS → Root NS'],
    a:1, x:'DNS lookup: 1)Browser DNS cache, 2)OS hosts file (/etc/hosts), 3)OS resolver cache, 4)Configured DNS server (recursive resolver) which then: 5)Queries Root NS → 6)Root returns TLD NS → 7)Query TLD NS → 8)TLD returns Authoritative NS → 9)Query Authoritative NS → 10)Get IP. Result cached with TTL at each level.' },
  { id:'p02', cat:'web',
    q:'TCP 3-way handshake — correct sequence?',
    o:['SYN-ACK → SYN → ACK','ACK → SYN → SYN-ACK','SYN (client) → SYN-ACK (server) → ACK (client) — connection established','FIN → ACK → FIN → ACK (that\'s connection teardown)'],
    a:2, x:'3-way handshake (OSI Layer 4): 1) Client sends SYN (SEQ=x), 2) Server replies SYN-ACK (SEQ=y, ACK=x+1), 3) Client sends ACK (ACK=y+1). Connection established. Connection close (4-way): FIN → ACK → FIN → ACK. SYN flood attacks send many SYN packets without completing handshakes.' },
  { id:'p03', cat:'web',
    q:'What happens during a TLS handshake (HTTPS connection)?',
    o:['Username and password are sent in plaintext for initial authentication','Client Hello → Server Hello + Certificate → Browser validates cert → Key exchange → Symmetric session keys derived → Encrypted channel ready','TLS handshake only occurs on the very first HTTPS connection ever made','The TLS handshake only encrypts the URL, not the page content'],
    a:1, x:'TLS 1.3 handshake: 1)Client Hello (supported ciphers, random), 2)Server Hello + Certificate + key share, 3)Client validates cert against trusted CAs (root → intermediate → server cert chain), 4)Derive session keys using asymmetric crypto (ECDHE), 5)Finished + Encrypted channel. TLS 1.3 is faster (1-RTT vs 2-RTT in TLS 1.2).' },
  { id:'p04', cat:'web',
    q:'Match the correct default ports: SSH, DNS, SMTP, RDP, MySQL, PostgreSQL',
    o:['SSH:22, DNS:53, SMTP:25, RDP:3389, MySQL:3306, PostgreSQL:5432','SSH:443, DNS:80, SMTP:110, RDP:22, MySQL:1433, PostgreSQL:3306','SSH:22, DNS:53, SMTP:587, RDP:3390, MySQL:5432, PostgreSQL:3306','SSH:21, DNS:53, SMTP:25, RDP:3389, MySQL:3306, PostgreSQL:5432  (SSH:21 is wrong — that\'s FTP data)'],
    a:0, x:'Key ports for datacenter: FTP=20/21, SSH=22, Telnet=23, SMTP=25(587 TLS), DNS=53, HTTP=80, HTTPS=443, SMB=445, MSSQL=1433, MySQL=3306, RDP=3389, PostgreSQL=5432, VNC=5900, SNMP=161/162, Syslog=514, Samba=139/445.' },
  { id:'p05', cat:'web',
    q:'What is the purpose of a load balancer in a datacenter?',
    o:['Stores frequently accessed content closer to end users (that\'s a CDN)','Distributes incoming traffic across multiple backend servers — improves availability (health checks remove failed servers) and scalability (horizontal scaling)','Encrypts all traffic between servers in the datacenter','Monitors server hardware health via SNMP'],
    a:1, x:'Load balancers (F5 BIG-IP, HAProxy, NGINX, AWS ALB, GCP LB): Layer 4 (TCP — based on IP/port) or Layer 7 (HTTP — based on URL, headers, cookies). Features: health checks, SSL/TLS termination, session persistence (sticky sessions), connection limits, rate limiting. Active-passive or active-active configurations.' },
  { id:'p06', cat:'web',
    q:'What is a CDN (Content Delivery Network)?',
    o:['A type of RAID for web servers','A geographically distributed network of edge servers that caches static content (images, JS, CSS, video) close to end users — reduces latency and origin server load','A datacenter routing protocol for content-addressed networks','A DNS record type for distributing traffic across multiple servers'],
    a:1, x:'CDN edge nodes (PoPs — Points of Presence) are located worldwide. When a user requests an asset, they\'re served from the nearest edge node (low latency). The origin server is only contacted on cache miss. Examples: Cloudflare, AWS CloudFront, Akamai, Fastly. Also protects against DDoS attacks by absorbing traffic at the edge.' },
  { id:'p07', cat:'web',
    q:'DNS record types — A record vs CNAME vs MX vs NS?',
    o:['A = hostname → IP; AAAA = hostname → IPv6; CNAME = hostname → another hostname (alias); MX = mail server; NS = nameserver','A = IPv6; AAAA = IPv4; CNAME = certificate; MX = CDN mapping','A and CNAME are identical in function','MX records point to IP addresses directly (no hostname)'],
    a:0, x:'DNS record types: A = IPv4, AAAA = IPv6, CNAME = alias (e.g., www → example.com), MX = mail server with priority, NS = authoritative nameservers, TXT = arbitrary text (SPF/DKIM/DMARC for email, domain verification), SRV = service location, PTR = reverse DNS (IP→name).' },
  { id:'p08', cat:'web',
    q:'A web application returns HTTP 502. What does this mean?',
    o:['The client sent a malformed request (that\'s 400 Bad Request)','Authentication required (that\'s 401 Unauthorized)','The gateway/proxy/load balancer received an invalid or no response from the upstream server','The resource was permanently deleted (that\'s 410 Gone)'],
    a:2, x:'HTTP 5xx = server-side errors. 502 Bad Gateway: proxy/LB got an invalid response from the backend (upstream down, crashed, connection refused, timeout). Fixes: check backend health, logs, restart app server. Other 5xx: 500=Internal Error, 503=Service Unavailable (overloaded/maintenance), 504=Gateway Timeout (backend too slow).' },
  { id:'p09', cat:'web',
    q:'TTL (Time To Live) in DNS and IP routing — correct explanation?',
    o:['DNS TTL and IP TTL both measure time in seconds until expiration — same concept','DNS TTL = how long a record is cached before re-querying (seconds). IP TTL = a counter decremented by each router — when it reaches 0 the packet is dropped + ICMP Time Exceeded is sent (this is how traceroute works).','TTL only exists in DNS; IP routing has no TTL concept','IP TTL is set by the DNS server; DNS TTL is set by the router'],
    a:1, x:'Two very different concepts sharing a name: (1) DNS TTL: set by domain owner in the zone file, tells resolvers how long to cache. Low TTL = fast updates, high DNS traffic. High TTL = slower propagation, less DNS traffic. (2) IP TTL: OS sets initial value (Windows=128, Linux=64), each router decrements by 1. Traceroute exploits TTL expiry to map hops.' },
  { id:'p10', cat:'web',
    q:'What is the role of ARP during the web browsing process?',
    o:['ARP translates the server\'s domain name to its IP address (that\'s DNS)','ARP resolves the default gateway\'s IP address to its MAC address — required to build the Ethernet frame to send the first packet (OSI Layer 2)','ARP establishes the TLS encrypted session with the web server','ARP is part of the TCP 3-way handshake (Layer 4)'],
    a:1, x:'Before sending any IP packet, the host must know the Layer 2 (MAC) address of the first hop (default gateway). ARP broadcasts "Who has 192.168.1.1?" on the local subnet. The gateway replies with its MAC. This allows the host to build the Ethernet frame (Layer 2 encapsulation). The ARP reply is cached in the ARP table to avoid repeated broadcasts.' },
];

// ── Category order for display ──
const CAT_ORDER = ['networking','linux','windows','hardware','web'];

// ============================================================
// STATE
// ============================================================
let state = {
  screen: 'home',    // 'home' | 'quiz' | 'results'
  answers: {},       // id → option index (0-3)
  timer: 0,
  timerHandle: null,
  results: null,
  showAnswers: false,
};

// ============================================================
// HISTORY  (localStorage)
// ============================================================
const LS_KEY = 'dc_study_history';

function getHistory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
}

function addHistory(entry) {
  const h = getHistory();
  h.unshift(entry);
  if (h.length > 30) h.splice(30);
  localStorage.setItem(LS_KEY, JSON.stringify(h));
}

function clearHistory() {
  localStorage.removeItem(LS_KEY);
}

// ============================================================
// TIMER
// ============================================================
function startTimer() {
  state.timer = 0;
  state.timerHandle = setInterval(() => {
    state.timer++;
    const el = document.getElementById('timer');
    if (el) {
      el.textContent = fmtTime(state.timer);
      el.className = 'timer' +
        (state.timer > 3600 ? ' urgent' : state.timer > 1800 ? ' warn' : '');
    }
    // update answered count
    const ac = document.getElementById('answered-count');
    if (ac) {
      const n = Object.keys(state.answers).length;
      ac.innerHTML = `<strong>${n}</strong> / ${Q.length} answered`;
    }
    // update progress bar
    const pb = document.getElementById('progress-fill');
    if (pb) pb.style.width = (Object.keys(state.answers).length / Q.length * 100) + '%';
  }, 1000);
}

function stopTimer() {
  if (state.timerHandle) { clearInterval(state.timerHandle); state.timerHandle = null; }
}

function fmtTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
}

// ============================================================
// HELPERS
// ============================================================
function pct(n, t) { return t > 0 ? Math.round(n / t * 100) : 0; }
function scoreClass(p) { return p >= 80 ? 'score-good' : p >= 60 ? 'score-ok' : 'score-bad'; }
function circleClass(p) { return p >= 80 ? 'great' : p >= 60 ? 'ok' : 'poor'; }
function badge(cat) { return `<span class="badge badge-${CATS[cat].css}">${CATS[cat].label}</span>`; }

function dateStr(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US',{month:'short',day:'2-digit'}) + ' ' +
    d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
}

// ============================================================
// RENDER HOME
// ============================================================
function renderHome() {
  state.screen = 'home';
  const hist = getHistory();

  const totalTests = hist.length;
  const avgScore = totalTests
    ? Math.round(hist.reduce((s,e) => s + e.pct, 0) / totalTests) : 0;
  const best = totalTests ? Math.max(...hist.map(e => e.pct)) : 0;
  const last = totalTests ? hist[0].pct : 0;

  // Most missed question IDs
  const errCount = {};
  hist.forEach(e => (e.wrong || []).forEach(id => { errCount[id] = (errCount[id]||0)+1; }));
  const topErrors = Object.entries(errCount)
    .sort((a,b) => b[1]-a[1]).slice(0,10)
    .map(([id, cnt]) => {
      const q = Q.find(x => x.id === id);
      return q ? `<span class="weak-tag">${CATS[q.cat].label}: ${q.q.slice(0,55)}… (×${cnt})</span>` : '';
    }).join('');

  const histRows = hist.slice(0,10).map((e,i) => {
    const p = e.pct;
    return `<tr>
      <td>${i===0?'<strong>Latest</strong>':i+1}</td>
      <td>${dateStr(e.date)}</td>
      <td class="${scoreClass(p)}">${e.score}/${e.total}</td>
      <td class="${scoreClass(p)}">${p}%</td>
      <td>${fmtTime(e.seconds || 0)}</td>
      <td>${(e.wrong||[]).length + (e.unanswered||[]).length}</td>
    </tr>`;
  }).join('');

  document.getElementById('app').innerHTML = `
<div class="page fade-in">
  <div class="home-hero">
    <h1>DataCenter Study 🖥️</h1>
    <p>Interactive quiz covering all key datacenter topics. Complete all questions, then click <strong>Evaluate</strong>.</p>
    <div class="topic-tags">
      ${CAT_ORDER.map(c => `<span class="badge badge-${CATS[c].css}">${CATS[c].label} (${Q.filter(q=>q.cat===c).length}q)</span>`).join('')}
    </div>
    <p style="color:var(--muted);margin-bottom:20px;">Total: <strong style="color:var(--text)">${Q.length} questions</strong></p>
    <button class="btn btn-primary" data-action="start">▶ Start Test</button>
  </div>

  ${totalTests > 0 ? `
  <div class="home-stats">
    <div class="stat-box"><div class="val">${totalTests}</div><div class="lbl">Tests Taken</div></div>
    <div class="stat-box"><div class="val ${scoreClass(avgScore)}">${avgScore}%</div><div class="lbl">Average Score</div></div>
    <div class="stat-box"><div class="val ${scoreClass(best)}">${best}%</div><div class="lbl">Best Score</div></div>
    <div class="stat-box"><div class="val ${scoreClass(last)}">${last}%</div><div class="lbl">Last Score</div></div>
  </div>` : ''}

  <div class="section-title">Test History</div>
  ${totalTests === 0
    ? '<div class="empty-state">No tests taken yet. Start your first test above!</div>'
    : `<table class="history-table">
        <thead><tr><th>#</th><th>Date</th><th>Score</th><th>%</th><th>Time</th><th>Errors</th></tr></thead>
        <tbody>${histRows}</tbody>
      </table>
      <div style="text-align:right;margin-top:8px;">
        <button class="btn btn-sm" data-action="clear-history" style="color:var(--wrong);border-color:var(--wrong)">🗑 Clear History</button>
      </div>`
  }

  ${topErrors ? `
  <div class="section-title">Most Missed Questions</div>
  <div class="weak-list">${topErrors}</div>` : ''}
</div>`;
}

// ============================================================
// RENDER QUIZ
// ============================================================
function renderQuiz() {
  state.screen = 'quiz';
  state.answers = {};
  state.evaluated = false;
  state.showAnswers = false;

  const sections = CAT_ORDER.map(cat => {
    const qs = Q.filter(q => q.cat === cat);
    const items = qs.map((q, qi) => {
      const globalIdx = Q.indexOf(q);
      return `
<div class="q-card" id="card-${q.id}" data-id="${q.id}">
  <div class="q-header">
    ${badge(cat)}
    <span class="q-num">Q${globalIdx+1}</span>
    <span class="q-status" id="status-${q.id}"></span>
  </div>
  <div class="q-text">${q.q}</div>
  <div class="options" id="opts-${q.id}">
    ${['A','B','C','D'].map((l,i) => `
    <div class="option" data-id="${q.id}" data-idx="${i}">
      <span class="opt-letter">${l}</span>
      <span class="opt-text">${q.o[i]}</span>
    </div>`).join('')}
  </div>
  <div class="explanation" id="exp-${q.id}"><strong>Explanation:</strong> ${q.x}</div>
</div>`;
    }).join('');

    return `
<div class="cat-section">
  <div class="cat-header">
    <span class="badge badge-${CATS[cat].css}" style="font-size:13px;padding:4px 12px">${CATS[cat].label}</span>
    <span class="cat-count">${qs.length} questions</span>
    <div class="cat-line" style="background:${CATS[cat].color};opacity:.3"></div>
  </div>
  ${items}
</div>`;
  }).join('');

  document.getElementById('app').innerHTML = `
<div id="quiz-header" class="quiz-header">
  <h2>DataCenter Study</h2>
  <div class="progress-wrap">
    <div class="progress-bar-bg"><div class="progress-bar-fill" id="progress-fill" style="width:0%"></div></div>
    <span class="progress-label" id="answered-count">0 / ${Q.length} answered</span>
  </div>
  <div class="timer" id="timer">00:00</div>
</div>
<div class="quiz-body">${sections}</div>
<div class="eval-sticky">
  <div class="answered-count" id="answered-count-footer"><strong>0</strong> / ${Q.length} answered</div>
  <div style="display:flex;gap:10px">
    <button class="btn btn-sm" data-action="back-home">← Home</button>
    <button class="btn btn-success" data-action="evaluate" style="padding:10px 28px;font-size:15px">✓ Evaluate</button>
  </div>
</div>`;

  startTimer();
}

// ============================================================
// SELECT ANSWER
// ============================================================
function selectAnswer(qid, idx) {
  if (state.evaluated) return;
  state.answers[qid] = idx;

  // Update all options for this question
  document.querySelectorAll(`.option[data-id="${qid}"]`).forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.idx) === idx);
  });

  // Update progress
  const n = Object.keys(state.answers).length;
  const pb = document.getElementById('progress-fill');
  if (pb) pb.style.width = (n / Q.length * 100) + '%';
  const ac = document.getElementById('answered-count');
  if (ac) ac.textContent = `${n} / ${Q.length} answered`;
  const af = document.getElementById('answered-count-footer');
  if (af) af.innerHTML = `<strong>${n}</strong> / ${Q.length} answered`;
}

// ============================================================
// EVALUATE
// ============================================================
function evaluate() {
  stopTimer();
  state.evaluated = true;

  const results = {
    score: 0,
    total: Q.length,
    time: state.timer,
    wrong: [],
    unanswered: [],
    answers: { ...state.answers },
    perCat: {},
  };

  CAT_ORDER.forEach(c => { results.perCat[c] = { correct: 0, total: 0 }; });

  Q.forEach(q => {
    const sel = state.answers[q.id];
    results.perCat[q.cat].total++;

    const card = document.getElementById(`card-${q.id}`);
    const statusEl = document.getElementById(`status-${q.id}`);
    const opts = document.querySelectorAll(`.option[data-id="${q.id}"]`);
    opts.forEach(o => o.classList.add('disabled'));

    if (sel === undefined) {
      results.unanswered.push(q.id);
      if (card) card.classList.add('unans');
      if (statusEl) statusEl.textContent = '⚪';
    } else if (sel === q.a) {
      results.score++;
      results.perCat[q.cat].correct++;
      if (card) card.classList.add('correct');
      if (statusEl) statusEl.textContent = '✅';
      opts.forEach((o,i) => {
        if (i === q.a) o.classList.add('opt-correct');
      });
    } else {
      results.wrong.push(q.id);
      if (card) card.classList.add('wrong');
      if (statusEl) statusEl.textContent = '❌';
      opts.forEach((o,i) => {
        if (i === sel) o.classList.add('opt-wrong-sel');
        else if (i === q.a) o.classList.add('opt-correct');
        else o.classList.add('opt-correct-dim');
      });
    }

    // Show explanation for wrong/unanswered
    const expEl = document.getElementById(`exp-${q.id}`);
    if (expEl && (sel !== q.a)) expEl.classList.add('visible');
  });

  // Save to history
  addHistory({
    id: Date.now(),
    date: new Date().toISOString(),
    score: results.score,
    total: results.total,
    pct: pct(results.score, results.total),
    seconds: results.time,
    wrong: results.wrong,
    unanswered: results.unanswered,
  });

  state.results = results;

  // Replace sticky bar
  const sticky = document.querySelector('.eval-sticky');
  if (sticky) {
    const p = pct(results.score, results.total);
    sticky.innerHTML = `
      <div style="font-size:15px">
        Final score: <strong class="${scoreClass(p)}">${results.score}/${results.total} (${p}%)</strong>
        &nbsp;⏱ ${fmtTime(results.time)}
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-sm" data-action="scroll-results">📊 See Results</button>
        <button class="btn btn-sm" data-action="toggle-all-answers">👁 Toggle All Explanations</button>
        <button class="btn btn-primary btn-sm" data-action="go-results">Full Results →</button>
      </div>`;
  }

  // Scroll to first wrong answer
  const firstWrong = results.wrong[0] || results.unanswered[0];
  if (firstWrong) {
    const el = document.getElementById(`card-${firstWrong}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior:'smooth', block:'center' }), 300);
  }
}

// ============================================================
// RENDER RESULTS
// ============================================================
function renderResults() {
  const r = state.results;
  if (!r) return renderHome();

  const p = pct(r.score, r.total);
  state.screen = 'results';

  const catRows = CAT_ORDER.map(cat => {
    const c = r.perCat[cat];
    const cp = pct(c.correct, c.total);
    return `
<div class="cat-score-row">
  <div class="cat-score-name">${badge(cat)}</div>
  <div class="cat-score-bar">
    <div class="cat-score-fill" style="width:${cp}%;background:${cp>=80?'var(--correct)':cp>=60?'var(--unanswered)':'var(--wrong)'}"></div>
  </div>
  <div class="cat-score-pct ${scoreClass(cp)}">${c.correct}/${c.total} (${cp}%)</div>
</div>`;
  }).join('');

  const questionList = Q.map((q, qi) => {
    const sel = r.answers[q.id];
    const isCorrect = sel === q.a;
    const isUnans = sel === undefined;
    const cls = isUnans ? 'unans-card' : isCorrect ? 'correct-card' : 'wrong-card';
    const icon = isUnans ? '⚪' : isCorrect ? '✅' : '❌';

    let detail = '';
    if (!isCorrect) {
      detail += `<div class="result-correct-ans">✅ Correct: ${String.fromCharCode(65+q.a)}) ${q.o[q.a]}</div>`;
      if (!isUnans) detail += `<div class="result-your-ans">❌ Your answer: ${String.fromCharCode(65+sel)}) ${q.o[sel]}</div>`;
      else detail += `<div class="result-your-ans">⚪ Not answered</div>`;
    }

    return `
<div class="result-q-card ${cls}" id="rq-${q.id}">
  <div class="result-q-top">
    <div class="result-q-icon">${icon}</div>
    <div style="flex:1">
      ${badge(q.cat)}
      <span style="font-size:11px;color:var(--muted);margin-left:6px">Q${qi+1}</span>
      <div class="result-q-text">${q.q}</div>
      ${detail}
    </div>
  </div>
  <div class="result-exp ${state.showAnswers||!isCorrect?'visible':''}" id="rexp-${q.id}"><strong>Explanation:</strong> ${q.x}</div>
</div>`;
  }).join('');

  document.getElementById('app').innerHTML = `
<div class="page fade-in" id="results-top">
  <div class="results-hero">
    <div class="score-circle ${circleClass(p)}">
      <div class="score-pct ${scoreClass(p)}">${p}%</div>
      <div class="score-raw">${r.score} / ${r.total}</div>
    </div>
    <div class="results-meta">
      <span>⏱ Time: <strong>${fmtTime(r.time)}</strong></span>
      <span>✅ Correct: <strong style="color:var(--correct)">${r.score}</strong></span>
      <span>❌ Wrong: <strong style="color:var(--wrong)">${r.wrong.length}</strong></span>
      <span>⚪ Unanswered: <strong style="color:var(--unanswered)">${r.unanswered.length}</strong></span>
    </div>
  </div>

  <div class="section-title">Score by Category</div>
  <div class="cat-scores">${catRows}</div>

  <div class="result-actions">
    <button class="btn btn-primary" data-action="retake">🔄 Retake Test</button>
    <button class="btn" data-action="back-home">🏠 Home</button>
  </div>

  <div class="section-title">Question Review</div>
  <button class="toggle-answers-btn" data-action="toggle-answers">
    ${state.showAnswers ? '🙈 Hide All Explanations' : '👁 Show All Explanations'}
  </button>
  <div class="results-q-list">${questionList}</div>
  <div style="text-align:center;margin-top:24px">
    <button class="btn btn-primary" data-action="retake">🔄 Retake Test</button>
  </div>
</div>`;
}

// ============================================================
// EVENT DELEGATION
// ============================================================
document.addEventListener('click', e => {
  // Option selection
  const opt = e.target.closest('.option[data-id]');
  if (opt && !opt.classList.contains('disabled')) {
    selectAnswer(opt.dataset.id, parseInt(opt.dataset.idx));
    return;
  }

  const action = e.target.closest('[data-action]')?.dataset?.action;
  if (!action) return;

  switch (action) {
    case 'start':
      renderQuiz();
      window.scrollTo(0,0);
      break;

    case 'evaluate':
      if (Object.keys(state.answers).length === 0) {
        alert('Please answer at least one question before evaluating!');
        return;
      }
      evaluate();
      window.scrollTo(0,0);
      break;

    case 'go-results':
      renderResults();
      window.scrollTo(0,0);
      break;

    case 'scroll-results': {
      const el = document.getElementById('quiz-header');
      if (el) el.scrollIntoView({ behavior:'smooth' });
      break;
    }

    case 'toggle-all-answers': {
      const exps = document.querySelectorAll('.explanation');
      const anyVisible = [...exps].some(e => e.classList.contains('visible'));
      exps.forEach(e => e.classList.toggle('visible', !anyVisible));
      const btn = document.querySelector('[data-action="toggle-all-answers"]');
      if (btn) btn.textContent = anyVisible ? '👁 Toggle All Explanations' : '🙈 Hide Explanations';
      break;
    }

    case 'toggle-answers': {
      state.showAnswers = !state.showAnswers;
      document.querySelectorAll('[id^="rexp-"]').forEach(el => el.classList.toggle('visible', state.showAnswers));
      const btn = document.querySelector('[data-action="toggle-answers"]');
      if (btn) btn.textContent = state.showAnswers ? '🙈 Hide All Explanations' : '👁 Show All Explanations';
      break;
    }

    case 'retake':
      stopTimer();
      renderQuiz();
      window.scrollTo(0,0);
      break;

    case 'back-home':
      stopTimer();
      renderHome();
      window.scrollTo(0,0);
      break;

    case 'clear-history':
      if (confirm('Clear all test history? This cannot be undone.')) {
        clearHistory();
        renderHome();
      }
      break;
  }
});

// ============================================================
// INIT
// ============================================================
renderHome();

export const documents = [
    {
        id: "doc1",
        title: "Malware Detection Policy",
        content: `
            Malware Detection scans email attachments
            and links for known malicious content.

            Messages matching malware signatures
            are blocked immediately.
        `
    },
    {
        id: "doc2",
        title: "Bad Sender Reputation Policy",
        content: `
            Sender reputation evaluates historical
            trustworthiness of a sender.

            Low reputation senders may be blocked.
        `
    },
    {
        id: "doc3",
        title: "Attachment Scanning",
        content: `
            Attachments are scanned using
            antivirus engines and threat intelligence.
        `
    }
];

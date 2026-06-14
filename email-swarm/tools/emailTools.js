export async function getMessageDetails({ messageId }) {
    return {
        messageId,
        sender: "badguy@evil.com",
        recipient: "user@company.com",
        subject: "Invoice Attached"
    }
}

export async function getSenderReputation({sender}) {
    return {
        sender,
        reputation: "Good",
        score: 90
    }
}

export async function getPolicyMatches({ messageId }) {
    return {
        matchedPolicies: [
            "Malware Detection",
            "Bad Sender Reputation"
        ]
    }
}

export async function getDeliveryStatus({ messageId }) {
    return {
        status: "Blocked"
    }
}

export async function getThreatIntel({ sender }) {
    return {
        knownCampaign: "Invoice Malware Campaign",
        severity: "High"
    };
}

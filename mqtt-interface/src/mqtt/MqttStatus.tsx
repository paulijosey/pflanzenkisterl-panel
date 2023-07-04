// MqttStatus.tsx
import React, { useEffect, useState } from 'react';
import MqttSubscription from './mqttSetup';
import mqttConfig from './mqttConfig';

const MqttStatus: React.FC = () => {
    const [pumpStatus, setPumpStatus] = useState<boolean | null>(null);
    const [ledStatus, setLedStatus] = useState<boolean | null>(null);

    // load mqtt config
    const { pumpStatusTopic, ledStatusTopic } = mqttConfig;

    MqttSubscription([
        {
            topic: pumpStatusTopic,
            handler: (message) => {
                const msg = JSON.parse(message);
                setPumpStatus(msg.Power);
            },
        },
    ]);

    MqttSubscription([
        {
            topic: ledStatusTopic,
            handler: (message) => {
                const msg = JSON.parse(message);
                setLedStatus(msg.Power);
            },
        },
    ]);

    return (
        <div>
            <h2>Status</h2>
            <div>
                <h3>Pump</h3>
                <p>Status: {pumpStatus === null ? 'Loading...' : (pumpStatus ? 'On' : 'Off')}</p>
            </div>
            <div>
                <h3>LED</h3>
                <p>Status: {ledStatus === null ? 'Loading...' : (ledStatus ? 'On' : 'Off')}</p>
            </div>
        </div>
    );
};

export default MqttStatus;

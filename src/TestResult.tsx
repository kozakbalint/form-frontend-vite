interface TestResultProps {
    msg: string;
}

const TestResult: React.FC<TestResultProps> = ({ msg }) => {
    return msg.includes("succeed") ? (
        <div className="text-xl text-green-600">{msg}</div>
    ) : (
        <div className="text-xl text-red-600">{msg}</div>
    );
};

export default TestResult;

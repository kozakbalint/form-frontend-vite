import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import NumberInputField from "./NumberInputField";
import { ScoreTypes } from "./ScoreTypes";
import useScores from "./useScores";
import SelectInputField from "./SelectInputField";
import ScoreEntry from "./ScoreEntry";

interface ScoresFormValues {
    name: ScoreTypes;
    value: number;
}

const Datasets: React.FC = () => {
    const { scores, addScore } = useScores();
    const selectOptions = Object.values(ScoreTypes).map((type) => (
        <option key={type} value={type}>
            {type}
        </option>
    ));
    const initialValues: ScoresFormValues = {
        name: ScoreTypes.acc,
        value: 0,
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .oneOf(Object.values(ScoreTypes), "Must be a Score type.")
            .required("Required"),
        value: Yup.number()
            .required("Required")
            .test(
                "is-percent",
                "Must be a percentage or a value between 0 and 1",
                (value) => {
                    return (
                        (value >= 0 && value <= 1) ||
                        (value >= 0 && value <= 100)
                    );
                }
            ),
    });

    return (
        <main className="flex flex-col items-center gap-4 pt-4">
            <div className="w-4/5 md:w-9/12">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const score = {
                            isActive: true,
                            name: values.name,
                            value:
                                values.value > 1
                                    ? values.value / 100
                                    : values.value,
                        };
                        addScore(score);
                    }}
                >
                    {() => (
                        <Form className="flex flex-col gap-3">
                            <div className="flex justify-center gap-5">
                                <Field
                                    name="name"
                                    component={SelectInputField}
                                    label="Score Type:"
                                >
                                    {selectOptions}
                                </Field>
                                <Field
                                    name="value"
                                    component={NumberInputField}
                                    label="Value:"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-fit rounded bg-green-600 p-2 text-white hover:bg-green-400"
                                >
                                    Add Score
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <table className="mx-2 table-auto border-collapse rounded border border-gray-300 md:table-fixed">
                    <thead>
                        <tr>
                            <th className="w-40 border border-gray-300"></th>
                            <th className="w-40 border border-gray-300">
                                Score Type:
                            </th>
                            <th className="w-40 border border-gray-300">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {scores.map((scores) => (
                            <ScoreEntry key={scores.name} scores={scores} />
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Datasets;

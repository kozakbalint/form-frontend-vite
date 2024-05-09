import { Field, Form, Formik } from "formik";
import useDatasets from "./useDatasets";
import * as Yup from "yup";
import TextInputField from "./TextInputField";
import NumberInputField from "./NumberInputField";
import DatasetEntry from "./DatasetEntry";

interface DatasetsFormValues {
    name: string;
    firstNum: number;
    secondNum: number;
    thirdNum: number;
}

const Datasets: React.FC = () => {
    const { datasets, addDataset } = useDatasets();
    const initialValues: DatasetsFormValues = {
        name: "",
        firstNum: 0,
        secondNum: 0,
        thirdNum: 0,
    };
    const validationSchema = Yup.object()
        .shape({
            name: Yup.string()
                .min(3, "Too short!")
                .max(10, "Too long!")
                .required("Required field"),
            firstNum: Yup.number()
                .min(1, "Must be bigger than 0.")
                .required("Required field"),
            secondNum: Yup.number()
                .min(1, "Must be bigger than 0.")
                .required("Required field"),
            thirdNum: Yup.number()
                .min(1, "Must be bigger than 0.")
                .required("Required field"),
        })
        .test(
            "sum-of-2-3",
            "The first number must be equal the sum of the second and third number",
            (values, ctx) => {
                const { firstNum, secondNum, thirdNum } = values;
                if (firstNum === secondNum + thirdNum) {
                    return true;
                }
                return ctx.createError({
                    path: "firstNum",
                    message:
                        "The first number mus be equal the sum of the second and third number.",
                });
            }
        );

    return (
        <main className="flex flex-col items-center gap-4 pt-4">
            <div className="w-4/5 md:w-9/12">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const dataset = {
                            isActive: true,
                            name: values.name,
                            firstNum: values.firstNum,
                            secondNum: values.secondNum,
                            thirdNum: values.thirdNum,
                        };
                        addDataset(dataset);
                    }}
                >
                    {() => (
                        <Form className="flex flex-col gap-3">
                            <div className="">
                                <Field
                                    name="name"
                                    component={TextInputField}
                                    label="Dataset Name:"
                                />
                            </div>
                            <div className="flex flex-col gap-3 md:flex-row">
                                <Field
                                    name="firstNum"
                                    component={NumberInputField}
                                    label="#:"
                                />
                                <Field
                                    name="secondNum"
                                    component={NumberInputField}
                                    label="P:"
                                />
                                <Field
                                    name="thirdNum"
                                    component={NumberInputField}
                                    label="N:"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-fit rounded bg-green-600 p-2 text-white hover:bg-green-400"
                                >
                                    Add Dataset
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
                                Name:
                            </th>
                            <th className="w-40 border border-gray-300">#:</th>
                            <th className="w-40 border border-gray-300">P:</th>
                            <th className="w-40 border border-gray-300">N:</th>
                            <th className="w-40 border border-gray-300">
                                Active:
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {datasets.map((dataset) => (
                            <DatasetEntry
                                key={dataset.name}
                                dataset={dataset}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Datasets;

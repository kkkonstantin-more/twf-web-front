// import React, { useState } from "react";
//
// import { useFieldArray, useForm, FormProvider } from "react-hook-form";
//
// import "./custom-forms.scss";
// import LevelForm, {
//   Level,
//   LevelType,
// } from "../../constructors/task-constructor/task-constructor.component";
//
// import Icon from "@mdi/react";
// import { mdiPlus } from "@mdi/js";
// import MathQuillEditor from "../math-quill-editor/math-quill-editor";
//
// interface CustomFormsProps {
//   width?: string;
// }
// interface HiddenFields {}
//
// const CustomForms: React.FC<CustomFormsProps> = ({
//   width,
// }: CustomFormsProps) => {
//   type FormInputs = {
//     gameName: string;
//     gameSpace: string;
//     levels: Level[];
//   };
//   const [hiddenFields, setHiddenFields] = useState<HiddenFields>();
//
//   const methods = useForm<FormInputs>({
//     mode: "onSubmit",
//   });
//
//   const { register, getValues, control } = methods;
//
//   const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
//     {
//       control, // control props comes from useForm (optional: if you are using FormContext)
//       name: "levels", // unique name for your Field Array
//     }
//   );
//
//   return (
//     <div className="custom-forms" style={{ width }}>
//       <FormProvider {...methods}>
//         <div className="form-group">
//           <label>Название игры</label>
//           <input
//             name="gameName"
//             type="text"
//             className="form-control"
//             ref={register}
//           />
//         </div>
//         <div className="form-group">
//           <label>Game Space</label>
//           <input
//             name="gameSpace"
//             type="text"
//             className="form-control"
//             ref={register}
//           />
//         </div>
//         <h3>Уровни</h3>
//         <div className="custom-forms__levels">
//           {fields.map((field) => {
//             return (
//               <div
//                 key={field.id}
//                 style={{ display: "flex", alignItems: "center" }}
//               >
//                 {/*<LevelForm*/}
//                 {/*  index={index}*/}
//                 {/*  defaultValue={fields[index]}*/}
//                 {/*  remove={remove}*/}
//                 {/*  swap={swap}*/}
//                 {/*  append={append}*/}
//                 {/*/>*/}
//               </div>
//             );
//           })}
//           <button
//             className="btn"
//             onClick={() => {
//               append({
//                 levelType: LevelType.AUTO,
//               });
//             }}
//           >
//             <Icon path={mdiPlus} size={1.2} />
//             <span>автоматический уровень</span>
//           </button>
//           <button
//             className="btn"
//             onClick={() => {
//               append({
//                 levelType: LevelType.MANUAL,
//               });
//             }}
//           >
//             <Icon path={mdiPlus} size={1.2} />
//             <span>ручной уровень</span>
//           </button>
//         </div>
//         <button
//           className="btn u-mt-md"
//           onClick={() => console.log(getValues())}
//         >
//           get values
//         </button>
//       </FormProvider>
//     </div>
//   );
// };
//
// export default CustomForms;
export default 2;

// import React, { useState, useEffect } from "react";
// import styled from 'styled-components';
// import logo from "/logomarca.png";
// import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
// import { FloatingLabel, Form, Modal, Button as BsButton } from "react-bootstrap";
// import { sendEmailReset } from "../services/auth";
// import CustomModal from "../components/CustomModal";
// import { useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [modal, setModal] = useState({ show: false, type: "info", message: "" });
//   const navigate = useNavigate();

//   const handleSendEmailPasswordReset = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await sendEmailReset(email);

//       if (response.status === 201) {
//         setModal({
//           show: true,
//           type: "success",
//           message: "Email enviado com sucesso! Verifique sua caixa de entrada.",
//         });
//       }
//     } catch (error) {
//       const mensagemErro = error?.response?.data?.message || "Erro ao conectar com o servidor.";
//       setModal({
//         show: true,
//         type: "error",
//         message: mensagemErro,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Styled.ResetPage>
//       <Styled.Container>
//         <Styled.LeftPanel>

//         </Styled.LeftPanel>

//         <Styled.RightPanel>
//           <Styled.Logo src={logo} alt="logo" />

//           <form className="w-100" style={{ maxWidth: "250px" }} onSubmit={handleSendEmailPasswordReset}>
//             <Styled.CustomFloating as={FloatingLabel} controlId="email" label="Email" className="mb-3">
//               <Form.Control
//                 type="text"
//                 placeholder="Insira seu Email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Styled.CustomFloating>

//             <hr className="my-4 border-light" />

//             <Styled.Button type="submit" disabled={loading || !email}>
//               {loading ? <><FaSpinner className="spin me-2" /> Entrando...</> : "Enviar"}
//             </Styled.Button>

//             <div className="text-center mt-3">
//               <Styled.Link href="/">Voltar para o Login!</Styled.Link>
//             </div>
//           </form>
//         </Styled.RightPanel>
//       </Styled.Container>
//       <CustomModal
//         show={modal.show}
//         type={modal.type}
//         message={modal.message}
//         onHide={() => setModal({ ...modal, show: false })}
//       />
//     </Styled.ResetPage >
//   );
// }

// const Styled = {
//   Container: styled.div`
//     display: flex;
//     width: 100%;
//     height: 100vh;
//     overflow: hidden;
//     flex-direction: row;
//   `,

//   Logo: styled.img`
//     max-width: 265px;
//     display: block;
//     margin: 0 auto 1rem auto;
//   `,

//   ResetPage: styled.div`
//   width: 100%;
//   height: 100vh;
//   overflow: hidden;
//   `,

//   LeftPanel: styled.div`
//     flex: 2.8;
//     position: relative;
//     height: 100%;
//     overflow: hidden;

//     @media (max-width: 767px) {
//       display: none;
//     }
//   `,

//   RightPanel: styled.div`
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     background-color: ${({ theme }) => theme.colors.primaryDarkTwo};
//     padding: 2rem 1rem;
//     height: 100%;

//     @media (min-width: 768px) {
//       max-width: 600px;
//       padding: 3rem 2rem;
//     }
//   `,

//   CustomFloating: styled.div`
//     .form-control {
//         background-color: ${({ theme }) => theme.colors.inputBg};
//         border: 1px solid ${({ theme }) => theme.colors.inputBorder};
//         color: ${({ theme }) => theme.colors.text};
//         padding: 0.8rem 0.75rem;
//         border-radius: 4px;

//         &:focus {
//         border-color: ${({ theme }) => theme.colors.primary};
//         box-shadow: none;
//         }
//     }

//     label {
//         color: ${({ theme }) => theme.colors.placeholder};
//     }

//     .form-control:focus ~ label {
//         color: ${({ theme }) => theme.colors.primary};
//     }
//   `,

//   Input: styled.input`
//     background-color: ${({ theme }) => theme.colors.inputBg};
//     border: 1px solid ${({ theme }) => theme.colors.inputBorder};
//     color: ${({ theme }) => theme.colors.text};
//     padding: 0.75rem;
//     border-radius: 4px;
//     width: 100%;
//     &::placeholder {
//       color: ${({ theme }) => theme.colors.placeholder};
//     }
//     &:focus {
//       outline: none;
//       border-color: ${({ theme }) => theme.colors.primary};
//     }
//   `,

//   Button: styled.button`
//     background-color: ${({ theme }) => theme.colors.primary};
//     color: #FFF;
//     border: none;
//     padding: 0.75rem;
//     border-radius: 4px;
//     width: 100%;
//     font-weight: bold;
//     transition: background-color 0.3s ease;
//     cursor: pointer;

//     &:hover {
//       background-color: ${({ theme }) => theme.colors.primaryDark};
//     }

//     &:disabled {
//       background-color: ${({ theme }) => theme.colors.primaryDark};
//       cursor: not-allowed;
//       opacity: 0.6;
//     }
//   `,

//   Link: styled.a`
//     color: ${({ theme }) => theme.colors.primary};
//     font-size: 0.875rem;
//     text-decoration: none;

//     &:hover {
//       text-decoration: underline;
//       color: ${({ theme }) => theme.colors.primaryDark};
//     }
//   `,
// };
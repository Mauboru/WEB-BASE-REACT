import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getUsers } from "../services/profile";
import styled from "styled-components";

export default function Home() {
    const [user, setUser] = useState(null);
    const [pendingCount, setPendingCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [accessLogs, setAccessLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [visuCount, setVisuCount] = useState(0);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(accessLogs.length / itemsPerPage);
    const paginatedLogs = accessLogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => {
            if (direction === "next" && prev < totalPages) return prev + 1;
            if (direction === "prev" && prev > 1) return prev - 1;
            return prev;
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("dataUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.user);
        } else {
            // Define usuário padrão se não existir no localStorage
            const defaultUser = { name: "Visitante", role: "visitor" };
            setUser(defaultUser);
            localStorage.setItem("dataUser", JSON.stringify({ user: defaultUser }));
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, accessRes] = await Promise.all([
                    getUsers(),
                    getAllAccess(),
                ]);

                const users = usersRes.data.users || [];
                const pendings = users.filter(u => u.status === "pending");

                setPendingCount(pendings.length);
                setTotalUsers(users.length);
                setAccessLogs(accessRes.data || []);
                setVisuCount(accessRes.data.length);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        if (user?.role === "manager") {
            // Primeira busca de dados
            fetchData();

            // Configurar o intervalo de atualização a cada 1 minuto
            const interval = setInterval(() => {
                fetchData();
            }, 60000); // 60,000 ms = 1 minuto

            // Limpar o intervalo ao desmontar o componente ou mudar o user
            return () => clearInterval(interval);
        }
    }, [user]);

    if (!user) {
        return (
            <MainLayout>
                <p>Carregando...</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <ContentWrapper>
                <MainTitle>Bem-vindo, {user.name}!</MainTitle>

                {user.role === "manager" ? (
                    <>
                        <InfoText>Total de usuários no sistema: <strong>{totalUsers}</strong></InfoText>
                        <InfoText>Pedidos de acesso pendentes: <strong>{pendingCount}</strong></InfoText>
                        <InfoText>Total de Visualizações: <strong>{visuCount}</strong></InfoText>

                        <StyledHeading>Registros de Acesso</StyledHeading>

                        {accessLogs.length === 0 ? (
                            <NoDataWrapper>
                                <img src="/no-data.png" alt="Sem dados" />
                                <p>Nenhum registro de acesso encontrado.</p>
                            </NoDataWrapper>
                        ) : (
                            <>
                                <StyledTable>
                                    <thead>
                                        <tr>
                                            <th>Usuário</th>
                                            <th>Data de Acesso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedLogs.map((log, index) => (
                                            <tr key={index}>
                                                <td>{log.user_name || "—"}</td>
                                                <td>{new Date(log.access_time).toLocaleString("pt-BR")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </StyledTable>
                                <PaginationWrapper>
                                    <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
                                        Anterior
                                    </button>
                                    <span>Página {currentPage} de {totalPages}</span>
                                    <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
                                        Próxima
                                    </button>
                                </PaginationWrapper>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <InfoText>Este é um ambiente de demonstração.</InfoText>
                        <InfoText>Para solicitar acesso completo, entre em contato com o administrador.</InfoText>
                    </>
                )}
            </ContentWrapper>
        </MainLayout>
    );
}

// Styled Components para os estilos
const StyledTable = styled.table`
    width: 80%;
    margin: 2rem auto;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    background-color: #333;
    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #444;
        color: #f4f4f4;
    }
    th {
        background-color: #2c2c2c;
        color: #fff;
        text-align: center;
    }
    td {
        text-align: center;
    }
    tr:nth-child(even) {
        background-color: #444;
    }
    tr:nth-child(odd) {
        background-color: #3a3a3a;
    }
    tr:hover {
        background-color: #555;
    }
    @media (max-width: 768px) {
        width: 95%;
        th, td {
            padding: 10px;
        }
    }
`;

const StyledHeading = styled.h3`
    text-align: center;
    margin-top: 2rem;
    font-size: 1.8rem;
    color:rgb(0, 0, 0);
`;

const ContentWrapper = styled.section`
    text-align: center;
    margin-top: 2rem;
    color: #e0e0e0;
`;

const MainTitle = styled.h1`
    font-size: 2rem;
    color:rgb(0, 0, 0);
    margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
    color:rgb(0, 0, 0);
    font-size: 1.1rem;
    margin: 0.5rem 0;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    button {
        background-color: #444;
        color: #fff;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    span {
        color: #000;
        font-weight: bold;
    }
`;

const NoDataWrapper = styled.div`
    margin-top: 2rem;
    text-align: center;
    img {
        width: 150px;
        opacity: 0.8;
    }
    p {
        margin-top: 1rem;
        font-size: 1.2rem;
        color: #000;
        font-weight: 500;
    }
`;

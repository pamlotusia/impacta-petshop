import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../contexts/AuthContext';

const Finance = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const { user } = UserAuth();

  const getWeekOfMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
    const offsetDate = date.getDate() + firstDayOfWeek - 1;
    return Math.floor(offsetDate / 7);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/all-schedules', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          });
          const processedData = processFinanceData(response.data);
          setMonthlyData(processedData);
        } catch (error) {
          console.error("Erro ao buscar os dados: ", error);
        }
      }
    };

    fetchData();
  }, [user]); // Adicionado 'user' como dependência para refazer a busca quando o usuário mudar

  const processFinanceData = (data) => {
    const mesesOrdenados = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const financeData = data.reduce((acc, curr) => {
      const date = new Date(curr.schedules);
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const week = getWeekOfMonth(date);

      if (!acc[month]) acc[month] = {};
      if (!acc[month][week]) acc[month][week] = { expectativa: 0, rendimento_bruto: 0 };

      acc[month][week].expectativa += parseFloat(curr.price);
      if (curr.status === 'Concluido') {
        acc[month][week].rendimento_bruto += parseFloat(curr.price);
      }

      return acc;
    }, {});

    // Ordena os dados com base nos meses
    const financeDataSorted = Object.entries(financeData).sort((a, b) => {
      return mesesOrdenados.indexOf(a[0].toLowerCase()) - mesesOrdenados.indexOf(b[0].toLowerCase());
    }).map(([month, weeks]) => ({
      mes: month,
      semanas: Object.entries(weeks).map(([week, values], index) => ({
        index,
        expectativa: values.expectativa.toFixed(2),
        rendimento_bruto: values.rendimento_bruto.toFixed(2),
      })),
    }));

    return financeDataSorted;
  };

  return (
    <div className="flex justify-center h-screen top-0 ml-[15%] w-[80%]">
      <div className="font-poppins">
        <p className="text-2xl grey-font my-5">Financeiro</p>
        {monthlyData.map((mes, mesIndex) => (
          <div key={mesIndex} className="my-10">
            <p className="font-bold pink-font text-xl my-2">{mes.mes}</p>
            <div className="finance-grid">
              {mes.semanas.map((semana) => (
                <div key={semana.index}>
                  <p className="text-1xl ml-2 grey-font">
                    Semana {semana.index + 1}
                  </p>
                  <div className="finance-cards">
                    <div className="w-[248px] h-[70px] btn-cancel flex flex-col justify-evenly rounded-[10px] grey-font font-nunito">
                      <p className="font-bold text-sm ml-2 pink-font">
                        expectativa:
                        <span className="font-normal grey-font ml-3">
                          R${semana.expectativa}
                        </span>
                      </p>
                      <p className="font-bold text-sm ml-2">
                        rendimento bruto:
                        <span className="font-normal ml-3">
                          R${semana.rendimento_bruto}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;

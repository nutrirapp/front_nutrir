import { ChartDataType, DataSet, DataSetReturned, RationDataType, NutritionalDataType } from "../types"

const mealChartDataFormatter = (data: DataSet): ChartDataType => {

  const palette = ["#e6004980", "#0bb4ff80", "#50e99180", "#e6d80080", "#9b19f580", "#ffa30080", "#dc0ab480", "#b3d4ff80", "#00bfa080", "#b3000080", "#7c115880", "#4421af80", "#1a53ff80", "#0d88e680", "#00b7c780", "#5ad45a80", "#8be04e80", "#ebdc7880"
  ]

  const lista = [...data.lista]
  const labels = lista.map(el => el.label)
  const set = new Set(labels)
  const labelsByMealArray = Array.from(set)
  const colorCodes: any = {}
  let index = 0

  labelsByMealArray.forEach(element => {
    Object.defineProperty(colorCodes, element, { value: palette[index] })
    index++
  });


  const listaWithColorCodes = lista.map(el => {
    const key: string = el.label
    return {
      label: el.label,
      data: el.data,
      backgroundColor: colorCodes[key]
    }
  })

  const dataFormatted = {
    labels: data.labels,
    datasets: listaWithColorCodes,
  }

  return dataFormatted
}

const ratioChartDataFormatter = (data: RationDataType) => {

  const lista = [...data.lista]

  return {
    labels: lista.map(el => el.fecha),
    datasets: [{
      label: 'Raciones por día',
      data: lista.map(el => el.cantidad),
      backgroundColor: "#0bb4ff80",
    }]
  }
}

const nutritionalChartDataFormatter = (data: NutritionalDataType) => {
  const lista = [...data.lista]
  
  // Crear datasets para cada nutriente
  const datasets = [
    {
      label: 'Hidratos de Carbono (g)',
      data: lista.map(el => el.hidratos),
      backgroundColor: "#e6004980",
      borderColor: "#e60049",
      borderWidth: 1
    },
    {
      label: 'Proteínas (g)',
      data: lista.map(el => el.proteinas),
      backgroundColor: "#0bb4ff80",
      borderColor: "#0bb4ff",
      borderWidth: 1
    },
    {
      label: 'Grasas Saturadas (g)',
      data: lista.map(el => el.grasasSaturadas),
      backgroundColor: "#50e99180",
      borderColor: "#50e991",
      borderWidth: 1
    },
    {
      label: 'Grasas Totales (g)',
      data: lista.map(el => el.grasasTotales),
      backgroundColor: "#e6d80080",
      borderColor: "#e6d800",
      borderWidth: 1
    },
    {
      label: 'Sodio (g)',
      data: lista.map(el => el.sodio / 1000),
      backgroundColor: "#ffa30080",
      borderColor: "#ffa300",
      borderWidth: 1
    }
  ]

  // Determinar las etiquetas basándose en si es mes o día
  const labels = lista.map(el => el.mes || el.dia)

  return {
    labels: labels,
    datasets: datasets
  }
}

const caloriesLineChartDataFormatter = (data: NutritionalDataType) => {
  const lista = [...data.lista]
  
  return {
    labels: lista.map(el => el.mes || el.dia),
    datasets: [{
      label: 'Kilocalorías por comensal (kcal)',
      data: lista.map(el => el.kilocalorias),
      backgroundColor: "#9b19f580",
      borderColor: "#9b19f5",
      borderWidth: 2,
      fill: false,
      tension: 0.1
    }]
  }
}

export {
  mealChartDataFormatter,
  ratioChartDataFormatter,
  nutritionalChartDataFormatter,
  caloriesLineChartDataFormatter
}

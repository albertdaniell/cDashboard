const sortMonths=(periods)=>{

    let holdSortedMonths = [...periods];
    let formattedMonths = [];
    holdSortedMonths.forEach(originalMonth => {
      let formattedMonth;
      let year;
      let monthValue;
      let monthName;

      year = originalMonth.slice(0, 4);
      monthValue = originalMonth.slice(4, 6);

      switch (monthValue) {
        case '01':
          monthName = 'January ';
          break;
        case '02':
          monthName = 'February ';
          break;
        case '03':
          monthName = 'March ';
          break;
        case '04':
          monthName = 'April ';
          break;
        case '05':
          monthName = 'May ';
          break;
        case '06':
          monthName = 'June ';
          break;
        case '07':
          monthName = 'July ';
          break;
        case '08':
          monthName = 'August ';
          break;
        case '09':
          monthName = 'September ';
          break;
        case '10':
          monthName = 'October ';
          break;
        case '11':
          monthName = 'November ';
          break;
        case '12':
          monthName = 'December ';
          break;
        case 'Q1':
          monthName = 'January';
          break;
        case 'Q2':
          monthName = 'February ';
          break;
        case 'Q3':
          monthName = 'March ';
          break;
        case 'Q4':
          monthName = 'April ';
          break;
        case 'Q5':
          monthName = 'May ';
          break;
        case 'Q6':
          monthName = 'June ';
          break;
        case 'Q7':
          monthName = 'July ';
          break;
        case 'Q8':
          monthName = 'August ';
          break;
        case 'Q9':
          monthName = 'September ';
          break;
        case 'Q10':
          monthName = 'October ';
          break;
        case 'Q11':
          monthName = 'November ';
          break;
        case 'Q12':
          monthName = 'December ';
          break

        case '':
          monthName = 'Year ';
          break
        default:
          break;
      }

      formattedMonth = `${monthName} ${year}`
      formattedMonths = [
        ...formattedMonths,
        formattedMonth
      ];
    });

    return formattedMonths
}


export default sortMonths;
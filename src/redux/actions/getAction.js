const url = 'https://5fc9346b2af77700165ae514.mockapi.io/simpsons';
export const GET_SIMPSONS = 'GET_SIMPSONS';
export const SAVE_CHARACHTER = 'SAVE_CHARACHTER';

export const getSimpsons = () => {
  return async dispatch => {
    try {
      const response = await fetch(url).then(response => response.json());
      console.log(response);
      dispatch({
        // eslint-disable-next-line no-undef
        type: GET_SIMPSONS,
        simpsonsList: response,
      });

      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
};

export const saveCharacter = data => {
  return async dispatch => {
    dispatch({
      // eslint-disable-next-line no-undef
      type: SAVE_CHARACHTER,
      simpsonsList: data,
    });
  };
};

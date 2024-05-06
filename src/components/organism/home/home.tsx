import { useEffect, useReducer } from "react";
import { useShow } from "../../../hooks/useShow";
import { Autocomplete } from "../../molecules/autocomplete/autocomplete";
import { Header } from "../../molecules/header/header";
import "./home.css";
import { ModalError } from "../../atoms/modalError/modalError";
import { AutoCompleteOption } from "../../../model";
import { CardShow } from "../../molecules/cardShow/cardShow";

enum ActionReducer {
  setResults = "setResults",
  setValue = "setValue",
  setLoading = "setLoading",
  setError = "setError",
  setSuccess = "setSuccess",
  setLimit = "setLimit",
  setSelectedOption = "setSelectedOption",
}

interface ReducerState {
  results: undefined;
  value: string;
  loading: boolean;
  error: undefined;
  limit: number;
  selectedOption: undefined;
}

const homeReducer = (
  state: ReducerState,
  { type, payload }: { type: string; payload: any }
) => {
  const reducer: Record<string, any> = {
    [ActionReducer.setResults]: () => ({ ...state, results: payload }),
    [ActionReducer.setValue]: () => ({
      ...state,
      value: payload,
      selectedOption: undefined,
    }),
    [ActionReducer.setLoading]: () => ({ ...state, loading: payload }),
    [ActionReducer.setSuccess]: () => ({ ...state, ...payload }),
    [ActionReducer.setError]: () => ({
      ...state,
      error: payload,
      value: undefined,
    }),
    [ActionReducer.setSelectedOption]: () => ({
      ...state,
      ...payload,
    }),
  };

  return reducer[type]();
};

const INIT_HOME_REDUCER = {
  results: undefined,
  value: "",
  loading: false,
  error: undefined,
  limit: 5,
  selectedOption: undefined,
};

export const Home = () => {
  const { getSearch } = useShow();
  const [state, dispatch] = useReducer(homeReducer, INIT_HOME_REDUCER);

  useEffect(() => {
    if (!state.value && state.loading) {
      dispatch({
        type: ActionReducer.setLoading,
        payload: false,
      });
      return;
    }

    if (!state.value) {
      return;
    }

    if (state.value && state.selectedOption) {
      return;
    }

    dispatch({
      type: ActionReducer.setLoading,
      payload: true,
    });
    const timeRef = setTimeout(async () => {
      try {
        const res = await getSearch(state.value);

        dispatch({
          type: ActionReducer.setSuccess,
          payload: {
            loading: false,
            results: res.map((show) => ({
              name: show.show.name,
              id: show.show.id,
            })),
          },
        });
      } catch (error) {
        dispatch({
          type: ActionReducer.setError,
          payload: {
            error: "Error",
            loading: false,
          },
        });
      }
    }, 500);

    return () => clearTimeout(timeRef);
  }, [state.value]);

  const handlerChange = async (str: string) => {
    dispatch({ type: ActionReducer.setValue, payload: str });
  };

  const handlerSelectOption = (option: AutoCompleteOption): void => {
    dispatch({
      type: ActionReducer.setSelectedOption,
      payload: {
        results: undefined,
        value: option.name,
        selectedOption: option,
      },
    });
  };

  return (
    <>
      <Header />
      <section className="home" role="main">
        <article>
          <h1>Welcome.</h1>
          <Autocomplete
            handlerSelectOption={handlerSelectOption}
            handlerChange={handlerChange}
            options={state.results}
            value={state.value}
            loading={state.loading}
            limit={state.limit}
            placeholder="Search a TV Show"
          />
          {state.selectedOption && <CardShow id={state.selectedOption.id} />}
        </article>

        {state.error && <ModalError open={state.error} />}
      </section>
    </>
  );
};

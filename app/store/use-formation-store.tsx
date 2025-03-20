import { create } from "zustand";
import axios from "axios";
import type { Formation } from "~/types/formation";
import api from "~/api";

interface FormationStore {
  formations: Formation[];
  loading: boolean;
  error: string | null;
  fetchFormations: () => Promise<void>;
  //   addFormation: (formationData: FormationPayload) => Promise<boolean>;
  removeFormation: (id: string) => Promise<boolean>;
}

const useFormationStore = create<FormationStore>((set) => ({
  formations: [],
  loading: false,
  error: null,

  fetchFormations: async () => {
    set({ loading: true, error: null, formations: [] });
    try {
      const response = await api.get<{ formations: Formation[] }>(
        "/admin/formations"
      );
      // Access the formations array from response.data.formations
      const formations = response.data.formations;
      set({ formations, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false, formations: [] });
    }
  },

  //   addFormation: async (formationData) => {
  //     try {
  //       const response = await axios.post<Formation>("https://api.talkenoo.click/api/formations", formationData);
  //       set((state) => ({ formations: [...state.formations, response.data] }));
  //       return true;
  //     } catch {
  //       return false;
  //     }
  //   },

  removeFormation: async (id) => {
    try {
      await axios.delete(`https://api.talkenoo.click/api/formations/${id}`);
      set((state) => ({
        formations: state.formations.filter((formation) => formation.id !== id),
      }));
      return true;
    } catch {
      return false;
    }
  },
}));

export default useFormationStore;

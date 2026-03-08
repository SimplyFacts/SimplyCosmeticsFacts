import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Plus } from "lucide-react-native";

export function ManualAddForm({ onAdd, isAdding }) {
  const [showForm, setShowForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = async () => {
    await onAdd(newIngredient.trim(), notes.trim() || null);
    setNewIngredient("");
    setNotes("");
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewIngredient("");
    setNotes("");
  };

  if (!showForm) {
    return (
      <View style={styles.manualSection}>
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          style={styles.showManualButton}
        >
          <Plus size={20} color="#6B7280" />
          <Text style={styles.showManualButtonText}>Add Custom Ingredient</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.manualSection}>
      <View style={styles.addForm}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Add Custom Alert</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={newIngredient}
          onChangeText={setNewIngredient}
          placeholder="Ingredient name (e.g., peanuts, gluten)"
          style={styles.input}
        />

        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes (optional)"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleAdd}
          disabled={!newIngredient.trim() || isAdding}
          style={[
            styles.addButton,
            !newIngredient.trim() && styles.addButtonDisabled,
          ]}
        >
          {isAdding ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Alert</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  manualSection: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  showManualButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  showManualButtonText: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 8,
    fontWeight: "500",
  },
  addForm: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    fontSize: 16,
    color: "#6B7280",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

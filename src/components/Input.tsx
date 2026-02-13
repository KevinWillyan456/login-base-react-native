import { StyleSheet, TextInput, type TextInputProps } from 'react-native'

export function Input({ ...props }: TextInputProps) {
  return <TextInput {...props} style={styles.input} />
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 12
  }
})

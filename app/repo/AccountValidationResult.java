package repo;

public class AccountValidationResult {
        public boolean isSuccess;
        public String errorMessage;
        public AccountValidationResult(boolean isSuccess, String errorMessage) {
                this.isSuccess = isSuccess;
                this.errorMessage = errorMessage;
        }
        public AccountValidationResult(boolean isSuccess) {
                this.isSuccess = isSuccess;
        }
}
